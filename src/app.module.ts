import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/module';
import { CompaniesModule } from './modules/companies/module';

@Module({
  imports: [DatabaseModule, CompaniesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
