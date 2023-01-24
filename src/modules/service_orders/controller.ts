import { HttpException, HttpStatus, Controller, Get, Body, Post, Logger, Param, Put } from "@nestjs/common";

import { ServiceOrdersService } from "./service";

@Controller('service_orders')
export class ServiceOrdersController {
    constructor(private readonly serviceOrdersService: ServiceOrdersService) {}

    @Get('get_by_service_id_and_company_id/:service_id/:company_id')
    async getServiceOrderByServiceIdAndCompanyId(@Param('service_id') service_id: number, @Param('company_id') company_id: number) {
        return this.serviceOrdersService.getByServiceIdAndCompanyId(service_id, company_id);
    }

    @Get('get_by_company_id/:company_id')
    async getServiceOrderByCompanyId(@Param('company_id') company_id: number) {
        return this.serviceOrdersService.getByCompanyId(company_id);
    }

    @Post()
    async createServiceOrder(@Body() data: any) {
        return this.serviceOrdersService.createServiceOrder(data);
    }

    @Get('get_new_id/:company_id')
    async getNewServiceOrderId(@Param('company_id') company_id: number) {
        return this.serviceOrdersService.getNewServiceOrderId(company_id);
    }

    @Put('update_by_service_id_and_company_id/:service_id/:company_id')
    async updateServiceOrderByServiceIdAndCompanyId(@Param('service_id') service_id: number, @Param('company_id') company_id: number, @Body() data: any) {
        return this.serviceOrdersService.updateByServiceIdAndCompanyId(service_id, company_id, data);
    }
}