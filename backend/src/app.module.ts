import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { AuthModule } from './modules/auth/auth.module'
import { PatientsModule } from './modules/patients/patients.module'
import { UsersModule } from './modules/users/users.module'
import { PaymentsModule } from './modules/payments/payments.module'
import { ConsultationsModule } from './modules/consultations/consultations.module'
import { ExamsModule } from './modules/exams/exams.module'
import { TreatmentsModule } from './modules/treatments/treatments.module'
import { PharmacyModule } from './modules/pharmacy/pharmacy.module'
import { AccountingModule } from './modules/accounting/accounting.module'
import { ReportsModule } from './modules/reports/reports.module'
import { DashboardModule } from './modules/dashboard/dashboard.module'
import { AuditModule } from './modules/audit/audit.module'
import { HospitalizationsModule } from './modules/hospitalizations/hospitalizations.module'
import { JwtAuthGuard } from './common/guards/jwt-auth.guard'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PatientsModule,
    UsersModule,
    PaymentsModule,
    ConsultationsModule,
    ExamsModule,
    TreatmentsModule,
    PharmacyModule,
    AccountingModule,
    ReportsModule,
    DashboardModule,
    AuditModule,
    HospitalizationsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
