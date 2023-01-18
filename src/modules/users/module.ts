import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersEntity } from "../../entities/users.entity";

import { MailModule } from "../mail/module";
import { CompaniesModule } from "../companies/module";

import { UsersService } from "./service";
import { UsersController } from "./controller";

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity]), MailModule, CompaniesModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}