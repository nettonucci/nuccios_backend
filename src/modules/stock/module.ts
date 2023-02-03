import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { StockController } from "./controller";
import { StockService } from "./service";

import { StockEntity } from "../../entities/stock.entity";

import { CompaniesModule } from "../companies/module";

import { AuthMiddleware } from "../middlewares/auth/auth.middleware";

@Module({
    imports: [TypeOrmModule.forFeature([StockEntity]), CompaniesModule],
    controllers: [StockController],
    providers: [StockService],
    exports: [StockService],
})
export class StockModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(StockController);
    }
  }