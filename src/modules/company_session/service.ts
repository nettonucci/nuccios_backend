import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as jwt from 'jsonwebtoken'
import * as Cryptr from 'cryptr';
import * as bcrypt from 'bcrypt';

import { CompaniesEntity } from "src/entities/companies.entity";
import { SecretsService } from "../utils/secrets/service";

@Injectable()
export class CompanySessionService {
    constructor(
        @InjectRepository(CompaniesEntity)
        private readonly companySessionRepository: Repository<CompaniesEntity>,
        private readonly secretsService: SecretsService
    ) {}
    
    async createSession(login: string, password: string) {

        const company = await this.companySessionRepository.findOne({
            where: { login }
        });

        if (!company) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        const passwordMatch = await bcrypt.compare(password, company.password);

        if (!passwordMatch) {
            throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
        }

        const cryptr = new Cryptr(this.secretsService.CRYPT_KEY);

        const data = {
            id: company.id,
            company_name: company.company_name,
        }

        const dataToken = cryptr.encrypt(JSON.stringify(data));

        const token = jwt.sign({ data: dataToken }, this.secretsService.CRYPT_KEY, {
            expiresIn: '1d'
        });

        return {
            token,
        };

    }

    async decodeToken(headers: any) {
        const token = headers.authorization.split(' ')[1];

        const cryptr = new Cryptr(this.secretsService.CRYPT_KEY);

        const data = jwt.verify(token, this.secretsService.CRYPT_KEY);

        const dataDecrypted = cryptr.decrypt(data['data']);

        return dataDecrypted;
    }
}