import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable, of } from 'rxjs'
import { tap } from 'rxjs/operators'

interface CacheEntry {
  data: any
  timestamp: number
}

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache = new Map<string, CacheEntry>()
  private readonly ttl = 60000 // 1 minute

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const key = `${request.method}-${request.url}`

    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < this.ttl) {
      return of(cached.data)
    }

    return next.handle().pipe(
      tap((data) => {
        this.cache.set(key, { data, timestamp: Date.now() })
      }),
    )
  }
}