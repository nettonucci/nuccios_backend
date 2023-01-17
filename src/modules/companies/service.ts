import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import {CompaniesEntity} from '../../entities/companies.entity';

@Injectable()
export class CompaniesService {
    constructor(
        @InjectRepository(CompaniesEntity) private readonly companiesRepository: Repository<CompaniesEntity>,
    ) {}

    async index(): Promise<CompaniesEntity[]> {
        const companies =  await this.companiesRepository.find();

        companies.forEach(company => {
            company.senha = '********';
        });

        return companies;
    }

    async show(id: number): Promise<CompaniesEntity> {
        const company = await this.companiesRepository.findOne({ where: { id } });

        if (!company) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        company.senha = '********';

        return company;

    }

    async create(data: CompaniesEntity): Promise<CompaniesEntity> {

        const { email, senha, cnpj, nome_empresa } = data;

        const companyExists = await this.companiesRepository.findOne({
            where: [ { email }, { cnpj }, { nome_empresa } ]
        });

        if (companyExists) {
            throw new HttpException('Company already exists', HttpStatus.BAD_REQUEST);
        }

        data.senha = await bcrypt.hash(senha, 10);

        const company = this.companiesRepository.create(data);

        await this.companiesRepository.save(company);

        company.senha = '********';

        return company; 
    }

}