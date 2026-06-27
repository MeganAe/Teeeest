import { Test, TestingModule } from '@nestjs/testing'
import { PatientsService } from '../../src/modules/patients/patients.service'
import { PrismaService } from '../../src/config/database/prisma.service'

describe('PatientsService', () => {
  let service: PatientsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PatientsService,
        { provide: PrismaService, useValue: { patient: { findMany: jest.fn(), findUnique: jest.fn(), create: jest.fn(), update: jest.fn() } } },
      ],
    }).compile()

    service = module.get<PatientsService>(PatientsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})