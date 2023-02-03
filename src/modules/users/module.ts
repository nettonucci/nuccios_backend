import { Module, NestModule, MiddlewareConsumer, RequestMethod} from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersEntity } from "../../entities/users.entity";

import { MailModule } from "../mail/module";
import { CompaniesModule } from "../companies/module";

import { UsersService } from "./service";
import { UsersController } from "./controller";

import { AuthMiddleware } from "../middlewares/auth/auth.middleware";

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity]), MailModule, CompaniesModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(UsersController);
    }
  }