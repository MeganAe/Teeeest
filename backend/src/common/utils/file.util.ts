import * as fs from 'fs'
import * as path from 'path'

export class FileUtil {
  static ensureDirectoryExists(dirPath: string): void {
    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true })
  }

  static deleteFile(filePath: string): void {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  }

  static getFileSize(filePath: string): number {
    return fs.statSync(filePath).size
  }

  static getExtension(filename: string): string {
    return path.extname(filename).toLowerCase()
  }

  static generateUniqueFilename(originalName: string): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    const ext = this.getExtension(originalName)
    return `${timestamp}-${random}${ext}`
  }
}