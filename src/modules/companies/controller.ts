import { HttpException, HttpStatus, Controller, Get, Body, Post, Logger, Param, Put } from "@nestjs/common";

import {CompaniesEntity} from '../../entities/companies.entity';
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
        if (!data.hasOwnProperty('nome_empresa') || 
            !data.hasOwnProperty('ramo') || 
            !data.hasOwnProperty('nome_proprietario') || 
            !data.hasOwnProperty('cpf') || 
            !data.hasOwnProperty('email') || 
            !data.hasOwnProperty('celular') || 
            !data.hasOwnProperty('senha')) 
        {
                Logger.error('Data not provided');
                throw new HttpException('Data not provided', HttpStatus.BAD_REQUEST);
        }
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