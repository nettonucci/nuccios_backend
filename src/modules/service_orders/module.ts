import { Module, Global } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ServiceOrdersController } from "./controller";
import { ServiceOrdersService } from "./service";

import { CompaniesModule } from "../companies/module";
import { UsersModule } from "../users/module";
import { ClientsModule } from "../clients/module";
import { ReservedIdsModule } from "../reserved_ids/module";
import { PublicCommentsModule } from "../public_comments/module";
import { PrivateCommentsModule } from "../private_comments/module";

import { ServiceOrderEntity } from "../../entities/serviceOrder.entity";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([ServiceOrderEntity]), 
    CompaniesModule,
    UsersModule, 
    ClientsModule, 
    ReservedIdsModule,
    PublicCommentsModule,
    PrivateCommentsModule
    ],
    controllers: [ServiceOrdersController],
    providers: [ServiceOrdersService],
    exports: [ServiceOrdersService],
})
export class ServiceOrdersModule {}