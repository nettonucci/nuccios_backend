import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientsService } from './service';
import { ClientsController } from './controller';
import { CompaniesModule } from "../companies/module";

import { ClientsEntity } from '../../entities/clients.entity';

import { AuthMiddleware } from "../middlewares/auth/auth.middleware";

@Module({
    imports: [TypeOrmModule.forFeature([ClientsEntity]), CompaniesModule],
    controllers: [ClientsController],
    providers: [ClientsService],
    exports: [ClientsService],
})
export class ClientsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(ClientsController);
    }
  }