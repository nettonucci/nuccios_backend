import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

import { ServiceOrderStockValuesService } from "./service";

@Controller('service_order_stock_values')
export class ServiceOrderStockValuesController {
    constructor(
        private readonly serviceOrderStockValuesService: ServiceOrderStockValuesService,
    ) {}
    @Get(':service_id/:company_id')
    async getByServiceIdAndCompanyId(@Param('service_id') service_id: number, @Param('company_id') company_id: number) {
        return this.serviceOrderStockValuesService.getByServiceIdAndCompanyId(service_id, company_id);
    }

    @Post()
    async createServiceOrder(@Body() data: any) {
        return this.serviceOrderStockValuesService.create(data);
    }

    // @Put(':id')
    // async updatePublicComment(@Param('id') id: number, @Body() data: any) {
    //     return this.serviceOrderStockValuesService.update(id, data);
    // }

    @Delete(':id')
    async deletePublicComment(@Param('id') id: number) {
        return this.serviceOrderStockValuesService.delete(id);
    }
}