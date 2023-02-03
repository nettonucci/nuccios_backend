import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserSessionController } from "./controller";
import { UserSessionService } from "./service";

import { UsersEntity } from "src/entities/users.entity";

import { AuthMiddleware } from "../middlewares/auth/auth.middleware";

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersEntity]),
    ],
    controllers: [UserSessionController],
    providers: [UserSessionService],
})
export class UserSessionModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .forRoutes(UserSessionController);
    }
  }

