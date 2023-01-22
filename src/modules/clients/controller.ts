import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { ClientsService } from './service';

@Controller('clients')
export class ClientsController {
    constructor(private readonly clientsService: ClientsService) { }

    @Get()
    async findAll() {
        return await this.clientsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return await this.clientsService.findOne(id);
    }

    @Get('company/:id')
    async findByCompanyId(@Param('id') id: number) {
        return await this.clientsService.findByCompanyId(id);
    }

    @Post()
    async create(@Body() data: any) {
        return await this.clientsService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: any) {
        return await this.clientsService.update(id, data);
    }
}