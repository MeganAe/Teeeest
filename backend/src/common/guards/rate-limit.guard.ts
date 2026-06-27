import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly requests = new Map<string, { count: number; firstRequest: number }>()

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const key = request.ip || request.connection.remoteAddress
    const now = Date.now()
    const windowMs = 60000 // 1 minute
    const maxRequests = 100

    const record = this.requests.get(key)
    if (record) {
      if (now - record.firstRequest > windowMs) {
        this.requests.set(key, { count: 1, firstRequest: now })
        return true
      }
      if (record.count >= maxRequests) {
        throw new HttpException('Trop de requêtes', HttpStatus.TOO_MANY_REQUESTS)
      }
      record.count++
      this.requests.set(key, record)
    } else {
      this.requests.set(key, { count: 1, firstRequest: now })
    }
    return true
  }
}