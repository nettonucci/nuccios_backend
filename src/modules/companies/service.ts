import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import {CompaniesEntity} from '../../entities/companies.entity';
import { MailService } from '../mail/service';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(CompaniesEntity) private readonly companiesRepository: Repository<CompaniesEntity>,
        private readonly mailService: MailService,
    ) {}

    async index(): Promise<CompaniesEntity[]> {
        const companies =  await this.companiesRepository.find();

        companies.forEach(company => {
            company.senha = '********';
            company.activeAccountToken = '********';
            company.resetPasswordToken = '********';
        });

        return companies;
    }

    async show(id: number): Promise<CompaniesEntity> {
        const company = await this.companiesRepository.findOne({ where: { id } });

        if (!company) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        company.senha = '********';
        company.activeAccountToken = '********';
        company.resetPasswordToken = '********';

        return company;

    }

    async create(data: CompaniesEntity): Promise<string> {

        const { email, senha, cnpj, nome_empresa } = data;

        const companyExists = await this.companiesRepository.findOne({
            where: [ { email }, { cnpj }, { nome_empresa } ]
        });

        if (companyExists) {
            throw new HttpException('Company already exists', HttpStatus.BAD_REQUEST);
        }

        data.senha = await bcrypt.hash(senha, 10);

        data.activeAccountToken = Math.random().toString().substring(2, 8)

        const company = this.companiesRepository.create(data);

        const resp = await this.companiesRepository.save(company);

        await this.mailService.sendMailToActiveCompanyAccount(data.email, data.activeAccountToken, data.nome_empresa);

        return JSON.parse(`{"message": "Company created", "id": ${resp.id}}`); 
    }

    async update(id: number, data: Partial<CompaniesEntity>): Promise<string> {

        const { email, celular, ramo, cnpj } = data;

        let company = await this.companiesRepository.findOne({ where: { id } });

        if (!company) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        if (company.active === false) {
            throw new HttpException('Company not activated', HttpStatus.BAD_REQUEST);
        }

        await this.companiesRepository.update({ id }, { email, celular, ramo, cnpj });

        return JSON.parse('{"message": "Company updated"}');

    }

    async updatePassword(id: number, data: any): Promise<string> {
            
        const { newPassword, oldPassword } = data;

        let company = await this.companiesRepository.findOne({ where: { id } });

        if (!company) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        if (company.active === false) {
            throw new HttpException('Company not activated', HttpStatus.BAD_REQUEST);
        }

        const isMatch = await bcrypt.compare(oldPassword, company.senha);

        if (!isMatch) {
            throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
        }  

        company.senha = await bcrypt.hash(newPassword, 10);

        await this.companiesRepository.update({ id }, {
            senha: company.senha
        });

        return JSON.parse('{"message": "Password updated"}');

        }

    async activeAccount(id: number, token: string): Promise<string> {
        
        const company = await this.companiesRepository.findOne({ where: { id } });

        if (!company) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }
        
        if (company.activeAccountToken !== token) {
            throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
        }
        
        await this.companiesRepository.update({ id }, { activeAccountToken: null, active: true });

        return JSON.parse('{"message": "Account activated"}');
    }

}