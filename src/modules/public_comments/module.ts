import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { PublicCommentsEntity } from "../../entities/publicComents.entity";
import { PublicCommentsService } from "./service";
import { PublicCommentsController } from "./controller";

import { CompaniesModule } from "../companies/module";
import { UsersModule } from "../users/module";

import { AuthMiddleware } from "../middlewares/auth/auth.middleware";

@Module({
    imports: [
        TypeOrmModule.forFeature([PublicCommentsEntity]),
        CompaniesModule,
        UsersModule,
    ],
    controllers: [PublicCommentsController],
    providers: [PublicCommentsService],
    exports: [PublicCommentsService],
})
export class PublicCommentsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(PublicCommentsController);
    }
  }