import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompaniesController } from './controller';
import { CompaniesService } from './service';
import { CompaniesEntity } from '../../entities/companies.entity';
import { MailModule } from '../mail/module';

@Module({
    imports: [TypeOrmModule.forFeature([CompaniesEntity]), MailModule],
    controllers: [CompaniesController],
    providers: [CompaniesService],
    exports: [CompaniesService],
})
export class CompaniesModule {}