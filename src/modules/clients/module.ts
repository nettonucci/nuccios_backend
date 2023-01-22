import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsService } from './service';
import { ClientsController } from './controller';
import { CompaniesModule } from "../companies/module";

import { ClientsEntity } from '../../entities/clients.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ClientsEntity]), CompaniesModule],
    controllers: [ClientsController],
    providers: [ClientsService],
    exports: [ClientsService],
})
export class ClientsModule { }