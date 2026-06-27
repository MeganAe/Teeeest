import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getStatus() {
    return { status: 'operational', version: '1.0.0' }
  }
}
