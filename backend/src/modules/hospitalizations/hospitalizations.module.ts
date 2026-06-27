import { Module } from '@nestjs/common'
import { HospitalizationsController } from './hospitalizations.controller'
import { HospitalizationsService } from './hospitalizations.service'
import { PrismaService } from '../../config/database/prisma.service'

@Module({
  controllers: [HospitalizationsController],
  providers: [HospitalizationsService, PrismaService],
  exports: [HospitalizationsService],
})
export class HospitalizationsModule {}