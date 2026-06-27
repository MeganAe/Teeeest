import { SetMetadata } from '@nestjs/common'

export const AUDIT_KEY = 'audit'
export interface AuditConfig {
  action: string
  entity: string
}
export const Audit = (config: AuditConfig) => SetMetadata(AUDIT_KEY, config)