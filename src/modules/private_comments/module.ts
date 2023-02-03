import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { PrivateCommentsEntity } from "../../entities/privateComents.entity";
import { PrivateCommentsService } from "./service";
import { PrivateCommentsController } from "./controller";

import { CompaniesModule } from "../companies/module";
import { UsersModule } from "../users/module";

import { AuthMiddleware } from "../middlewares/auth/auth.middleware";

@Module({
    imports: [
        TypeOrmModule.forFeature([PrivateCommentsEntity]),
        CompaniesModule,
        UsersModule,
    ],
    controllers: [PrivateCommentsController],
    providers: [PrivateCommentsService],
    exports: [PrivateCommentsService],
})
export class PrivateCommentsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(PrivateCommentsController);
    }
  }