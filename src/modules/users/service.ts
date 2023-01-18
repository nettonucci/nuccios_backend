import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UsersEntity } from "../../entities/users.entity";
import { MailService } from '../mail/service';

import { CompaniesService } from '../companies/service';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>, private readonly mailService: MailService, private readonly companiesService: CompaniesService) {}

    async index(): Promise<UsersEntity[]> {
        const users = await this.userRepository.find();

        users.forEach(user => {
            user.password = '********';
            user.activeAccountToken = '********';
            user.passwordResetToken = '********';
        });

        return users;
    }

    async showByCompany(id: number): Promise<UsersEntity[]> {
        const users = await this.userRepository.find({ where: { company_id: id } });

        users.forEach(user => {
            user.password = '********';
            user.activeAccountToken = '********';
            user.passwordResetToken = '********';
        });

        return users;
    }

    async show(id: number): Promise<UsersEntity> {
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        user.password = '********';
        user.activeAccountToken = '********';
        user.passwordResetToken = '********';

        return user;
    }

    async create(data: UsersEntity): Promise<string> {
        const { email, password, company_id } = data;

        const userExists = await this.userRepository.findOne({ where: [ { email }, { company_id } ] });

        const company = await this.companiesService.show(company_id);

        if (!company) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        if (userExists) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        data.password = await bcrypt.hash(password, 10);

        data.activeAccountToken = Math.random().toString().substring(2, 8)

        const user = this.userRepository.create(data);

        await this.userRepository.save(user);

        await this.mailService.sendMailToActiveUserAccount(data.email, data.activeAccountToken, company.nome_empresa, data.name);

        return JSON.parse('{"message": "User created"}');
    }
}