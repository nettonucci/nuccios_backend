import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ServiceOrdersController } from "./controller";
import { ServiceOrdersService } from "./service";

import { CompaniesModule } from "../companies/module";
import { UsersModule } from "../users/module";
import { ClientsModule } from "../clients/module";
import { ReservedIdsModule } from "../reserved_ids/module";
import { PublicCommentsModule } from "../public_comments/module";
import { PrivateCommentsModule } from "../private_comments/module";
import { ServiceOrderStockValuesModule } from "../service_order_stock_values/module";
import { ServiceOrderDetachedValuesModule } from "../service_order_detached_values/module";

import { ServiceOrderEntity } from "../../entities/serviceOrder.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ServiceOrderEntity]), 
    CompaniesModule,
    UsersModule, 
    ClientsModule, 
    ReservedIdsModule,
    PublicCommentsModule,
    PrivateCommentsModule,
    ServiceOrderStockValuesModule,
    ServiceOrderDetachedValuesModule
    ],
    controllers: [ServiceOrdersController],
    providers: [ServiceOrdersService],
    exports: [ServiceOrdersService],
})
export class ServiceOrdersModule {}