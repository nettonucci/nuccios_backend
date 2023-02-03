import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CompaniesEntity } from "src/entities/companies.entity";
import { CompanySessionController } from "./controller";
import { CompanySessionService } from "./service";

import { SecretsModule } from "../utils/secrets/module";

@Module({
    imports: [TypeOrmModule.forFeature([CompaniesEntity]), SecretsModule],
    controllers: [CompanySessionController],
    providers: [CompanySessionService]
})
export class CompanySessionModule {}