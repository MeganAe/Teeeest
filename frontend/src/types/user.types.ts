export type UserRole = 
  | 'ADMIN'
  | 'RECEPTIONIST'
  | 'PERCEPTEUR'
  | 'MEDECIN_DIRECTEUR'
  | 'MEDECIN_PSYCHIATRE'
  | 'MEDECIN_ORTHOPEDIEN'
  | 'LABORANTIN'
  | 'TECHNICIEN_EEG'
  | 'TECHNICIEN_ECG'
  | 'RADIOLOGUE'
  | 'KINESITHERAPEUTE'
  | 'INFIRMIER'
  | 'PHARMACIEN'
  | 'COMPTABLE'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  isActive: boolean
  lastLogin?: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserDto {
  email: string
  password: string
  firstName: string
  lastName: string
  role?: UserRole
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}