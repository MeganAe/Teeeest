import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { PrismaService } from '../../config/database/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AssignRoleDto } from './dto/assign-role.dto'
import * as bcrypt from 'bcrypt'
import { Prisma, Role } from '@prisma/client'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    const { page = 1, limit = 10, search, role, isActive } = query
    const skip = (page - 1) * limit

    const where: Prisma.UserWhereInput = {}
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
      ]
    }
    if (role) where.role = role as Role
    if (isActive !== undefined) where.isActive = isActive === 'true'

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
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
      }),
      this.prisma.user.count({ where }),
    ])

    return {
      users,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    }
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!user) {
      throw new NotFoundException(`Utilisateur avec ID ${id} non trouvé`)
    }

    return user
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    })
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(createUserDto.email)
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé')
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        password: hashedPassword,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        role: createUserDto.role || 'RECEPTIONIST',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findById(id)

    const data: any = {
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
    }

    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10)
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
      },
    })
  }

  async assignRole(id: string, assignRoleDto: AssignRoleDto) {
    await this.findById(id)

    return this.prisma.user.update({
      where: { id },
      data: { role: assignRoleDto.role },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    })
  }

  async delete(id: string) {
    await this.findById(id)
    return this.prisma.user.delete({ where: { id } })
  }

  async activate(id: string) {
    await this.findById(id)
    return this.prisma.user.update({
      where: { id },
      data: { isActive: true },
    })
  }

  async deactivate(id: string) {
    await this.findById(id)
    return this.prisma.user.update({
      where: { id },
      data: { isActive: false },
    })
  }
}