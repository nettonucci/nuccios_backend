import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";

import { StockService } from "./service";
import { StockEntity } from "../../entities/stock.entity";

@Controller("stock")
export class StockController {
    constructor(
        private readonly stockService: StockService
    ) {}

    @Get(':companyId')
    async getByCompanyId(@Param('companyId') companyId: number): Promise<StockEntity[]> {
        return await this.stockService.getByCompanyId(companyId);
    }

    @Post()
    async create(@Body() stock: StockEntity): Promise<StockEntity> {
        return await this.stockService.create(stock);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() stock: StockEntity): Promise<StockEntity> {
        return await this.stockService.update(id, stock);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return await this.stockService.delete(id);
    }
}