import { Module } from '@nestjs/common';

import { DatabaseModule } from './modules/database/module';
import { CompaniesModule } from './modules/companies/module';
import { MailModule } from './modules/mail/module';
import { MailTemplatesModule } from './modules/mail_templates/module';
import { UsersModule } from './modules/users/module';
import { ClientsModule } from './modules/clients/module';
import { ServiceOrdersModule } from './modules/service_orders/module';
import { ReservedIdsModule } from './modules/reserved_ids/module';
import { PublicCommentsModule } from './modules/public_comments/module';
import { PrivateCommentsModule } from './modules/private_comments/module';
import { StockModule } from './modules/stock/module';

import { SecretsModule } from './modules/utils/secrets/module';

@Module({
  imports: [
    DatabaseModule, 
    CompaniesModule, 
    MailModule, 
    MailTemplatesModule, 
    SecretsModule, 
    UsersModule, 
    ClientsModule, 
    ServiceOrdersModule,
    ReservedIdsModule,
    PublicCommentsModule,
    PrivateCommentsModule,
    StockModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
