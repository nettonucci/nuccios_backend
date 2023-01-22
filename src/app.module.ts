import { Module } from '@nestjs/common';

import { DatabaseModule } from './modules/database/module';
import { CompaniesModule } from './modules/companies/module';
import { MailModule } from './modules/mail/module';
import { MailTemplatesModule } from './modules/mail_templates/module';
import { UsersModule } from './modules/users/module';
import { ClientsModule } from './modules/clients/module';

import { SecretsModule } from './modules/utils/secrets/module';

@Module({
  imports: [DatabaseModule, CompaniesModule, MailModule, MailTemplatesModule, SecretsModule, UsersModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
