import { Controller, Post, Body, Headers } from "@nestjs/common";

import { UserSessionService } from "./service";

@Controller('user-session')
export class UserSessionController {
    constructor(
        private readonly userSessionService: UserSessionService
    ) {}

    @Post('/create-session')
    async createSession(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return await this.userSessionService.createSession(email, password);
    }
}