import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompaniesController } from './controller';
import { CompaniesService } from './service';
import { CompaniesEntity } from '../../entities/companies.entity';
import { MailModule } from '../mail/module';

import { AuthMiddleware } from '../middlewares/auth/auth.middleware';

@Module({
    imports: [TypeOrmModule.forFeature([CompaniesEntity]), MailModule],
    controllers: [CompaniesController],
    providers: [CompaniesService],
    exports: [CompaniesService],
})
export class CompaniesModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(AuthMiddleware)
        .exclude(
            { path: '/companies/active-account/:id', method: RequestMethod.POST },
            { path: '/companies', method: RequestMethod.POST },
        )
        .forRoutes(CompaniesController);
    }
  }