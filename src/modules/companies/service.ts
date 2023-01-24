import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CompaniesEntity } from '../../entities/companies.entity';
import { MailService } from '../mail/service';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(CompaniesEntity) private readonly companiesRepository: Repository<CompaniesEntity>,
        private readonly mailService: MailService,
    ) {}

    async index(): Promise<CompaniesEntity[]> {
        const companies =  await this.companiesRepository.find({
            select: ['id', 'company_name', 'has_cnpj', 'cnpj', 'branch', 'logo', 'owner_name', 'cpf', 'email', 'phone', 'cellphone', 'active']
        });

        return companies;
    }

    async show(id: number): Promise<CompaniesEntity> {
        const company = await this.companiesRepository.findOne(
            { where: 
                { 
                    id 
                },
                select: ['id', 'company_name', 'has_cnpj', 'cnpj', 'branch', 'logo', 'owner_name', 'cpf', 'email', 'phone', 'cellphone', 'active']
            });

        if (!company) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        return company;

    }

    async create(data: CompaniesEntity): Promise<string> {

        const { email, password, cnpj, company_name } = data;

        const companyExists = await this.companiesRepository.findOne({
            where: [ { email }, { cnpj }, { company_name } ]
        });

        if (companyExists) {
            throw new HttpException('Company already exists', HttpStatus.BAD_REQUEST);
        }

        data.password = await bcrypt.hash(password, 10);

        data.activeAccountToken = Math.random().toString().substring(2, 8)

        const company = this.companiesRepository.create(data);

        const resp = await this.companiesRepository.save(company);

        await this.mailService.sendMailToActiveCompanyAccount(data.email, data.activeAccountToken, data.company_name);

        return JSON.parse(`{"message": "Company created", "id": ${resp.id}}`); 
    }

    async update(id: number, data: Partial<CompaniesEntity>): Promise<string> {

        const { email, cellphone, branch, cnpj } = data;

        let company = await this.companiesRepository.findOne({ where: { id } });

        if (!company) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        if (company.active === false) {
            throw new HttpException('Company not activated', HttpStatus.BAD_REQUEST);
        }

        await this.companiesRepository.update({ id }, { email, cellphone, branch, cnpj });

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

        const isMatch = await bcrypt.compare(oldPassword, company.password);

        if (!isMatch) {
            throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
        }  

        company.password = await bcrypt.hash(newPassword, 10);

        await this.companiesRepository.update({ id }, {
            password: company.password
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