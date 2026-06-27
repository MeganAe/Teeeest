import * as crypto from 'crypto'

export class CryptoUtil {
  static generateRandomString(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex')
  }

  static generateToken(): string {
    return crypto.randomBytes(32).toString('hex')
  }

  static hashSHA256(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex')
  }

  static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }
}