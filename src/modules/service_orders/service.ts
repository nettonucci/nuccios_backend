import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ServiceOrderEntity } from "../../entities/serviceOrder.entity";

import { CompaniesService } from "../companies/service";
import { UsersService } from "../users/service";
import { ClientsService } from "../clients/service";
import { ReservedIdsService } from "../reserved_ids/service";

@Injectable()
export class ServiceOrdersService {
    constructor(
        @InjectRepository(ServiceOrderEntity)
        private readonly serviceOrdersRepository: Repository<ServiceOrderEntity>,
        private readonly reservedIdsService: ReservedIdsService,
        private readonly companiesService: CompaniesService,
        private readonly usersService: UsersService,
        private readonly clientsService: ClientsService,
    ) {}

    async getByServiceIdAndCompanyId(service_id: number, company_id: number): Promise<ServiceOrderEntity[]> {
        await this.companiesService.show(company_id);

        const serviceOrders = await this.serviceOrdersRepository.find({
            where: {
                service_id,
                company_id,
            },
            select: {
                company:
                {
                    company_name: true,
                    cnpj: true,
                    id: true,
                    branch: true,
                    email: true,
                    cellphone: true,
                },
                user:
                {
                    id: true,
                    name: true,
                    email: true,
                }
            },
            relations: ['company', 'user', 'client'],
        });

        return serviceOrders;
    }

    async getByCompanyId(company_id: number): Promise<ServiceOrderEntity[]> {
        await this.companiesService.show(company_id);

        const serviceOrders = await this.serviceOrdersRepository.find({
            where: {
                company_id,
            },
            select: {
                company:
                {
                    company_name: true,
                    cnpj: true,
                    id: true,
                    branch: true,
                    email: true,
                    cellphone: true,
                },
                user:
                {
                    id: true,
                    name: true,
                    email: true,
                }
            },
            relations: ['company', 'user', 'client'],
        });

        return serviceOrders;

    }

    async createServiceOrder(data: any) {

        const user = await this.usersService.show(data.user_id);

        if (user.company_id !== data.company_id) {
            throw new HttpException('This user does not belong to this company', HttpStatus.NOT_FOUND);
        }

        const client = await this.clientsService.findOne(data.client_id);

        if (client.company_id !== data.company_id) {
            throw new HttpException('This client does not belong to this company', HttpStatus.NOT_FOUND);
        }

        data.status = 'Aberto';

        await this.reservedIdsService.verifyReservedId(data.service_id, data.company_id);

        await this.serviceOrdersRepository.save(data);

        await this.reservedIdsService.updateServiceOrderId(data.service_id, data.company_id);

        return {
            message: 'Service Order created',
            service_id: data.service_id,
            company_id: data.company_id,
        }

    }

    async getNewServiceOrderId(company_id: number) {
        await this.companiesService.show(company_id);

        return await this.reservedIdsService.getNewServiceOrderId(company_id);
    }

    async updateByServiceIdAndCompanyId(service_id: number, company_id: number, data: any) {
        await this.companiesService.show(company_id);

        const serviceOrder = await this.serviceOrdersRepository.findOne({
            where: {
                service_id,
                company_id,
            },
        });

        if (!serviceOrder) {
            throw new HttpException('Service Order not found', HttpStatus.NOT_FOUND);
        }

        await this.serviceOrdersRepository.update({ service_id, company_id }, data);

        return {
            message: 'Service Order updated',
            service_id,
            company_id,
        }

    }
}