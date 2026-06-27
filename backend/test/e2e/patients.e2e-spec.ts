import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../../src/app.module'

describe('PatientsController (e2e)', () => {
  let app: INestApplication
  let authToken: string

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    // Login to get token
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@amka.cd', password: 'Admin123!' })
    authToken = loginRes.body.token
  })

  it('/patients (GET)', () => {
    return request(app.getHttpServer())
      .get('/patients')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})