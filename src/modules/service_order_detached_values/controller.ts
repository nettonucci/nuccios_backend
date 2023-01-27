import { Controller, Get, Post, Delete, Param, Body } from "@nestjs/common";

import { ServiceOrderDetachedValuesService } from "./service";

@Controller("service-order-detached-values")
export class ServiceOrderDetachedValuesController {
    constructor(
        private readonly serviceOrderDetachedValuesService: ServiceOrderDetachedValuesService,
    ) {}

    @Get(":serviceId/:companyId")
    async getByServiceIdAndCompanyId(@Param() params) {
        return await this.serviceOrderDetachedValuesService.getByServiceIdAndCompanyId(params.serviceId, params.companyId);
    }

    @Post()
    async create(@Body() data) {
        return await this.serviceOrderDetachedValuesService.create(data);
    }

    @Delete(":id")
    async delete(@Param() params) {
        return await this.serviceOrderDetachedValuesService.delete(params.id);
    }
}