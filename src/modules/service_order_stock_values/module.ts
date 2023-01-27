import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ServiceOrderStockValuesController } from "./controller";
import { ServiceOrderStockValuesService } from "./service";

import { StockModule } from "../stock/module";
import { UpdateServiceOrderPriceModule } from "../utils/update_service_order_price/module";

import { ServiceOrderStockValuesEntity } from "../../entities/serviceOrderStockValues.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ServiceOrderStockValuesEntity]), StockModule, UpdateServiceOrderPriceModule],
    controllers: [ServiceOrderStockValuesController],
    providers: [ServiceOrderStockValuesService],
    exports: [ServiceOrderStockValuesService],
})
export class ServiceOrderStockValuesModule {}