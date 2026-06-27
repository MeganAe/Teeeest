import { api } from './api'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
  }
  token: string
  refreshToken: string
}

interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout')
  },

  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    const response = await api.post('/auth/refresh', { refreshToken })
    return response.data
  },

  async changePassword(data: ChangePasswordData): Promise<void> {
    await api.post('/auth/change-password', data)
  },

  async forgotPassword(email: string): Promise<void> {
    await api.post('/auth/forgot-password', { email })
  },

  async resetPassword(token: string, password: string): Promise<void> {
    await api.post('/auth/reset-password', { token, password })
  },

  async getProfile(): Promise<any> {
    const response = await api.get('/auth/profile')
    return response.data
  },

  async updateProfile(data: any): Promise<any> {
    const response = await api.put('/auth/profile', data)
    return response.data
  },
}