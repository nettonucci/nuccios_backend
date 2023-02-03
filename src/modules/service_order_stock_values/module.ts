import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { ServiceOrderStockValuesController } from "./controller";
import { ServiceOrderStockValuesService } from "./service";

import { StockModule } from "../stock/module";
import { UpdateServiceOrderPriceModule } from "../utils/update_service_order_price/module";

import { ServiceOrderStockValuesEntity } from "../../entities/serviceOrderStockValues.entity";

import { AuthMiddleware } from "../middlewares/auth/auth.middleware";

@Module({
    imports: [TypeOrmModule.forFeature([ServiceOrderStockValuesEntity]), StockModule, UpdateServiceOrderPriceModule],
    controllers: [ServiceOrderStockValuesController],
    providers: [ServiceOrderStockValuesService],
    exports: [ServiceOrderStockValuesService],
})
export class ServiceOrderStockValuesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(ServiceOrderStockValuesController);
    }
  }