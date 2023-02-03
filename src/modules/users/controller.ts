import { Controller, Get, Post, Body, Param, Put, Headers } from '@nestjs/common';

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
    async create(@Body() data: any, @Headers() headers: any) {
        return this.usersService.create(data, headers);
    }

    @Put(':id')
    async update(@Param('id')
    id: number, @Body() data: any) {
        return this.usersService.update(id, data);
    }

    @Put('update-pass/:id')
    async updatePassword(@Param('id')
    id: number, @Body() data: any) {
        return this.usersService.updatePassword(id, data);
    }

    @Post('active-account/:id')
    async activeAccount(@Param('id')
    id: number, @Body() data: any) {
        return this.usersService.activeAccount(id, data.token);
    }
}