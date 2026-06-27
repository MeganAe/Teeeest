import { Module } from '@nestjs/common'
import { ExamsController } from './exams.controller'
import { ExamsService } from './exams.service'
import { PrismaService } from '../../config/database/prisma.service'

@Module({
  controllers: [ExamsController],
  providers: [ExamsService, PrismaService],
  exports: [ExamsService],
})
export class ExamsModule {}