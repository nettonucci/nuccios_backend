import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as jwt from 'jsonwebtoken'
import * as Cryptr from 'cryptr';
import * as bcrypt from 'bcrypt';

import { UsersEntity } from 'src/entities/users.entity';
import { SecretsService } from "../utils/secrets/service";

@Injectable()
export class UserSessionService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly userSessionRepository: Repository<UsersEntity>,
        private readonly secretsService: SecretsService,
    ) {}
    async createSession(email: string, password: string) {
        
        const user = await this.userSessionRepository.findOne({
            where: { email },
            relations: ['company'],
        });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
        }

        const cryptr = new Cryptr(this.secretsService.CRYPT_KEY);

        const data = {
            user_id: user.id,
            user_name: user.name,
            company_id: user.company.id,
            company_name: user.company.company_name,
        }

        const dataToken = cryptr.encrypt(JSON.stringify(data));

        const token = jwt.sign({ data: dataToken }, this.secretsService.CRYPT_KEY, {
            expiresIn: '1d'
        });

        return {
            token,
        };
    }

}