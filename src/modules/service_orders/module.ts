import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ServiceOrdersController } from "./controller";
import { ServiceOrdersService } from "./service";

import { CompaniesModule } from "../companies/module";
import { UsersModule } from "../users/module";
import { ClientsModule } from "../clients/module";
import { ReservedIdsModule } from "../reserved_ids/module";

import { ServiceOrderEntity } from "../../entities/serviceOrder.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ServiceOrderEntity]), CompaniesModule, UsersModule, ClientsModule, ReservedIdsModule],
    controllers: [ServiceOrdersController],
    providers: [ServiceOrdersService],
})
export class ServiceOrdersModule {}