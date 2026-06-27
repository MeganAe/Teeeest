import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../config/database/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async log(data: {
    userId: string
    action: string
    entity: string
    entityId?: string
    oldValues?: any
    newValues?: any
    ipAddress?: string
    userAgent?: string
  }) {
    return this.prisma.auditLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        oldValues: data.oldValues,
        newValues: data.newValues,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    })
  }

  async findAll(query: any) {
    const { page = 1, limit = 50, userId, entity, action, startDate, endDate } = query
    const skip = (page - 1) * limit

    const where: Prisma.AuditLogWhereInput = {}
    if (userId) where.userId = userId
    if (entity) where.entity = entity
    if (action) where.action = { contains: action, mode: 'insensitive' }
    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) where.createdAt.gte = new Date(startDate)
      if (endDate) where.createdAt.lte = new Date(endDate)
    }

    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { id: true, email: true, firstName: true, lastName: true, role: true },
          },
        },
      }),
      this.prisma.auditLog.count({ where }),
    ])

    return { logs, total, page: parseInt(page), totalPages: Math.ceil(total / limit) }
  }

  async getByUser(userId: string, query: any) {
    const { page = 1, limit = 50 } = query
    const skip = (page - 1) * limit

    const [logs, total] = await Promise.all([
      this.prisma.auditLog.findMany({
        where: { userId },
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } },
      }),
      this.prisma.auditLog.count({ where: { userId } }),
    ])

    return { logs, total, page: parseInt(page), totalPages: Math.ceil(total / limit) }
  }

  async getByEntity(entity: string, entityId: string) {
    return this.prisma.auditLog.findMany({
      where: { entity, entityId },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } },
    })
  }

  async getStats(days: number) {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const logs = await this.prisma.auditLog.findMany({
      where: { createdAt: { gte: startDate } },
    })

    const byAction = {}
    const byEntity = {}
    const byUser = {}
    const byDay = {}

    for (const log of logs) {
      byAction[log.action] = (byAction[log.action] || 0) + 1
      byEntity[log.entity] = (byEntity[log.entity] || 0) + 1
      byUser[log.userId] = (byUser[log.userId] || 0) + 1
      const dayKey = log.createdAt.toISOString().split('T')[0]
      byDay[dayKey] = (byDay[dayKey] || 0) + 1
    }

    return {
      period: `${days} jours`,
      total: logs.length,
      byAction,
      byEntity,
      byUser,
      byDay: Object.entries(byDay).map(([date, count]) => ({ date, count })),
    }
  }

  async export(startDate: Date, endDate: Date) {
    const logs = await this.prisma.auditLog.findMany({
      where: { createdAt: { gte: startDate, lte: endDate } },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, email: true, firstName: true, lastName: true } } },
    })
    return logs
  }
}