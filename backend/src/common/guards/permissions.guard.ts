import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator'
import { PrismaService } from '../../config/database/prisma.service'

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (!requiredPermissions) return true

    const { user } = context.switchToHttp().getRequest()
    if (!user) throw new ForbiddenException('Non authentifié')

    // Vérification des permissions basée sur le rôle
    const rolePermissions = {
      ADMIN: ['*'],
      MEDECIN_DIRECTEUR: ['consultations.*', 'patients.read', 'reports.medical'],
      RECEPTIONIST: ['patients.*', 'reception.*'],
      PERCEPTEUR: ['payments.*'],
      PHARMACIEN: ['pharmacy.*'],
    }

    const userPermissions = rolePermissions[user.role] || []
    if (userPermissions.includes('*')) return true

    const hasPermission = requiredPermissions.some(p => userPermissions.includes(p))
    if (!hasPermission) throw new ForbiddenException('Permissions insuffisantes')
    return true
  }
}