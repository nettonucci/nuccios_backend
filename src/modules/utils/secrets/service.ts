import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SecretsService extends ConfigService {
  constructor() {
    super()
  }

  ENV = this.get<string>('ENV')

  PORT = this.get<string>('PORT')

  DB_HOST = this.get<string>('DB_HOST')

  DB_PORT = this.get<string>('DB_PORT')

  DB_USER = this.get<string>('DB_USER')

  DB_PASSWORD = this.get<string>('DB_PASSWORD')

  DB_NAME = this.get<string>('DB_NAME')

  EMAIL = this.get<string>('EMAIL')

  GOOGLE_CLIENT_ID = this.get<string>('GOOGLE_CLIENT_ID')

  GOOGLE_CLIENT_SECRET = this.get<string>('GOOGLE_CLIENT_SECRET')

  GOOGLE_REFRESH_TOKEN = this.get<string>('GOOGLE_REFRESH_TOKEN')


}
