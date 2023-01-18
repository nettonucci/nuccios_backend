import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';

import { UsersService } from './service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async index() {
        return this.usersService.index();
    }

    @Get('/company/:id')
    async getByCompany(@Param('id') id: number) {
        return this.usersService.showByCompany(id);
    }

    @Get(':id')
    async show(@Param('id') id: number) {
        return this.usersService.show(id);
    }

    @Post()
    async create(@Body() data: any) {
        return this.usersService.create(data);
    }

    // @Put(':id')
    // async update(@Param('id')
    // id: number, @Body() data: any) {
    //     return this.usersService.update(id, data);
    // }

    // @Delete(':id')
    // async delete(@Param('id') id: number) {
    //     return this.usersService.delete(id);
    // }
}