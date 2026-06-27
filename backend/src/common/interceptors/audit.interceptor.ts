import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { AuditService } from '../../modules/audit/audit.service'
import { Reflector } from '@nestjs/core'
import { AUDIT_KEY, AuditConfig } from '../decorators/audit.decorator'

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    private auditService: AuditService,
    private reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const { user, method, url, ip, headers } = request
    const auditConfig = this.reflector.get<AuditConfig>(AUDIT_KEY, context.getHandler())

    if (!auditConfig || !user) {
      return next.handle()
    }

    const startTime = Date.now()

    return next.handle().pipe(
      tap({
        next: (data) => {
          this.auditService.log({
            userId: user.id,
            action: `${method} ${url}`,
            entity: auditConfig.entity,
            newValues: data,
            ipAddress: ip,
            userAgent: headers['user-agent'],
          })
        },
        error: (error) => {
          this.auditService.log({
            userId: user.id,
            action: `${method} ${url}`,
            entity: auditConfig.entity,
            oldValues: { error: error.message },
            ipAddress: ip,
            userAgent: headers['user-agent'],
          })
        },
      }),
    )
  }
}