import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UpdateServiceOrderPriceService } from "./service";

import { ServiceOrderEntity } from "../../../entities/serviceOrder.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ServiceOrderEntity])],
    providers: [UpdateServiceOrderPriceService],
    exports: [UpdateServiceOrderPriceService],
})
export class UpdateServiceOrderPriceModule {}