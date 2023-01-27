import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { StockController } from "./controller";
import { StockService } from "./service";

import { StockEntity } from "../../entities/stock.entity";

import { CompaniesModule } from "../companies/module";

@Module({
    imports: [TypeOrmModule.forFeature([StockEntity]), CompaniesModule],
    controllers: [StockController],
    providers: [StockService],
    exports: [StockService],
})
export class StockModule {}