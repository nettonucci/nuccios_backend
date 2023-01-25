import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

import { PrivateCommentsService } from "./service";


@Controller('private_comments')
export class PrivateCommentsController {
    constructor(
        private readonly privateCommentsService: PrivateCommentsService,
    ) {}
    @Get(':service_id/:company_id')
    async getByServiceIdAndCompanyId(@Param('service_id') service_id: number, @Param('company_id') company_id: number) {
        return this.privateCommentsService.getByServiceIdAndCompanyId(service_id, company_id);
    }

    @Post()
    async createServiceOrder(@Body() data: any) {
        return this.privateCommentsService.create(data);
    }

    @Put(':id')
    async updatePublicComment(@Param('id') id: number, @Body() data: any) {
        return this.privateCommentsService.update(id, data);
    }

    @Delete(':id')
    async deletePublicComment(@Param('id') id: number) {
        return this.privateCommentsService.delete(id);
    }
}