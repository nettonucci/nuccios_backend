import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

import { PublicCommentsService } from "./service";


@Controller('public_comments')
export class PublicCommentsController {
    constructor(
        private readonly publicCommentsService: PublicCommentsService,
    ) {}
    @Get(':service_id/:company_id')
    async getByServiceIdAndCompanyId(@Param('service_id') service_id: number, @Param('company_id') company_id: number) {
        return this.publicCommentsService.getByServiceIdAndCompanyId(service_id, company_id);
    }

    @Post()
    async createServiceOrder(@Body() data: any) {
        return this.publicCommentsService.create(data);
    }

    @Put(':id')
    async updatePublicComment(@Param('id') id: number, @Body() data: any) {
        return this.publicCommentsService.update(id, data);
    }

    @Delete(':id')
    async deletePublicComment(@Param('id') id: number) {
        return this.publicCommentsService.delete(id);
    }
}