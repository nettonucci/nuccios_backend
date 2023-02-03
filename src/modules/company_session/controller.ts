import { Controller, Post, Body, Get, Headers} from "@nestjs/common";

import { CompanySessionService } from "./service";

@Controller('company-session')
export class CompanySessionController {
    constructor(
        private readonly companySessionService: CompanySessionService
    ) {}

    @Post('/create-session')
    async createSession(
        @Body('login') login: string,
        @Body('password') password: string
    ) {
        return await this.companySessionService.createSession(login, password);
    }

    @Get('/decode-token')
    async decodeToken(@Headers() headers: string) {
        return await this.companySessionService.decodeToken(headers);
    }
}