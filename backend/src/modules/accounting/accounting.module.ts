import { Module } from '@nestjs/common'
import { AccountingController } from './accounting.controller'
import { AccountingService } from './accounting.service'
import { PrismaService } from '../../config/database/prisma.service'

@Module({
  controllers: [AccountingController],
  providers: [AccountingService, PrismaService],
  exports: [AccountingService],
})
export class AccountingModule {}