import { Role } from '@prisma/client'

export class UserEntity {
  id: string
  email: string
  firstName: string
  lastName: string
  role: Role
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}