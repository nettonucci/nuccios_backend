import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientsEntity } from '../../entities/clients.entity';
import { CompaniesService } from '../companies/service';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(ClientsEntity)
        private readonly clientsRepository: Repository<ClientsEntity>,
        private readonly companiesService: CompaniesService,
    ) { }

    async findAll(): Promise<ClientsEntity[]> {
        return await this.clientsRepository.find();
    }

    async findOne(id: number): Promise<ClientsEntity> {
        return await this.clientsRepository.findOne({ where: { id }});
    }

    async findByCompanyId(id: number): Promise<ClientsEntity[]> {
        return await this.clientsRepository.find({ where: { company_id: id }});
    }

    async create(data: ClientsEntity): Promise<string> {
        const { company_id } = data;

        const regex = /\d/g;
        const cpfFiltered = data.cpf.match(regex).join("");

        data.cpf = cpfFiltered;

        if (!company_id) {
            throw new HttpException('Company not informed', HttpStatus.NOT_FOUND);
        }

        const clientExists = await this.clientsRepository.findOne({ where: [ { cpf: cpfFiltered }, { company_id } ] });

        if (clientExists) {
            throw new HttpException('Client already exists', HttpStatus.BAD_REQUEST);
        }

        const company = await this.companiesService.show(company_id);

        if (!company) {
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }

        if (!company.active) {
            throw new HttpException('Company not active', HttpStatus.BAD_REQUEST);
        }

        const resp = await this.clientsRepository.save(data);

        return JSON.parse(`{"message": "Client created", "id": ${resp.id}}`);
    }

    async update(id: number, data: ClientsEntity): Promise<string> {

        const client = await this.clientsRepository.findOne({ where: { id } });

        if (!client) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        if (data.company_id) Reflect.deleteProperty(data, 'company_id');


        if (data.cpf) {
            const regex = /\d/g;

            const cpfFiltered = data.cpf.match(regex).join("");

            data.cpf = cpfFiltered;
        }

        console.log(data);

        await this.clientsRepository.update(id, data);

        return JSON.parse(`{"message": "User updated", "id": ${id}}`);

    }
}