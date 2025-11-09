export interface LoginRequest {
  email: string
  password: string
  code?: string // For 2FA
}

export interface RegisterRequest {
  name: string
  secondName: string           // Required, not optional
  email: string
  password: string
  passwordRepeat: string       // Required by backend
  avatar?: File
  studentIdFront?: File
  studentIdBack?: File
}

export interface AuthResponse {
  newUser?: User
  message?: string
  token?: string
  success?: boolean
}

export enum UserRole{
  'SuperAdmin'='SuperAdmin','Admin'="Admin",'Resident'="Resident",'SignedInUser'="SignedInUser", 'Regular'="Regular"
}

export interface User {
  id: string
  email: string
  displayName: string
  picture: string
  role: UserRole;
  secondName: string
  isVerified: boolean
  isTwoFactorEnabled: boolean
  isActive: boolean
  dormitoryId?: string
  roomId?: string
  createdAt: string
  updatedAt: string
}

export interface PasswordResetRequest {
  email: string
}