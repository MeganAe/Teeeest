import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../../config/database/prisma.service'
import { LoginDto } from './dto/login.dto'
import { RefreshTokenDto } from './dto/refresh-token.dto'
import { ChangePasswordDto } from './dto/change-password.dto'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (user && await bcrypt.compare(password, user.password)) {
      const { password: _, ...result } = user
      return result
    }
    return null
  }

  async login(loginDto: LoginDto, response: Response) {
    const { email, password } = loginDto
    const user = await this.validateUser(email, password)
    
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect')
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Compte désactivé')
    }

    const payload = { sub: user.id, email: user.email, role: user.role }
    const token = this.jwtService.sign(payload)
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN', '7d') }
    )

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    })

    // Store refresh token in cookie
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      token,
      refreshToken,
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const payload = this.jwtService.verify(refreshTokenDto.refreshToken)
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } })
      
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Token invalide')
      }

      const newPayload = { sub: user.id, email: user.email, role: user.role }
      const newToken = this.jwtService.sign(newPayload)
      
      return { token: newToken }
    } catch (error) {
      throw new UnauthorizedException('Refresh token invalide')
    }
  }

  async logout(userId: string, response: Response) {
    response.clearCookie('refresh_token')
    return { message: 'Déconnexion réussie' }
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé')
    }

    const isPasswordValid = await bcrypt.compare(changePasswordDto.currentPassword, user.password)
    if (!isPasswordValid) {
      throw new BadRequestException('Mot de passe actuel incorrect')
    }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10)
    
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    })

    return { message: 'Mot de passe modifié avec succès' }
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: forgotPasswordDto.email },
    })

    if (!user) {
      // Don't reveal that user doesn't exist
      return { message: 'Si un compte existe, un email de réinitialisation a été envoyé' }
    }

    const resetToken = this.jwtService.sign(
      { sub: user.id, type: 'reset' },
      { expiresIn: '1h' }
    )

    // Here you would send email with reset link
    // For now, just return token (in production, send email)
    return { message: 'Email de réinitialisation envoyé', resetToken }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    try {
      const payload = this.jwtService.verify(resetPasswordDto.token)
      if (payload.type !== 'reset') {
        throw new Error()
      }

      const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10)
      await this.prisma.user.update({
        where: { id: payload.sub },
        data: { password: hashedPassword },
      })

      return { message: 'Mot de passe réinitialisé avec succès' }
    } catch (error) {
      throw new BadRequestException('Token invalide ou expiré')
    }
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
      },
    })
    return user
  }
}