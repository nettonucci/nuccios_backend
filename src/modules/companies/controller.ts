import { HttpException, HttpStatus, Controller, Get, Body, Post, Logger, Param, Put } from "@nestjs/common";

import { CompaniesEntity } from '../../entities/companies.entity';
import { CompaniesService } from "./service";

@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Get()
    async index() {
        return this.companiesService.index();
    }

    @Get(':id')
    async show(@Param('id') id: number) {
        return this.companiesService.show(id);
    }

    @Post()
    async create(@Body() data: CompaniesEntity) {
        return this.companiesService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: Partial<CompaniesEntity>) {
        return this.companiesService.update(id, data);
    }

    @Put('update-pass/:id')
    async updatePassword(@Param('id') id: number, @Body() data: Partial<CompaniesEntity>) {
        return this.companiesService.updatePassword(id, data);
    }

    @Post('active-account/:id')
    async activeAccount(@Param('id') id: number, @Body() data: any) {
        return this.companiesService.activeAccount(id, data.token);
    }
}