import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ServiceOrderDetachedValuesController } from "./controller";
import { ServiceOrderDetachedValuesService } from "./service";

import { ServiceOrderDetachedValuesEntity } from "src/entities/serviceOrdersDetachedValues.entity";

import { UpdateServiceOrderPriceModule } from "../utils/update_service_order_price/module";

@Module({
    imports: [TypeOrmModule.forFeature([ServiceOrderDetachedValuesEntity]), UpdateServiceOrderPriceModule],
    controllers: [ServiceOrderDetachedValuesController],
    providers: [ServiceOrderDetachedValuesService],
    exports: [ServiceOrderDetachedValuesService],
})
export class ServiceOrderDetachedValuesModule {}