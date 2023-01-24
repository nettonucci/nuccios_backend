import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReservedIdsEntity } from 'src/entities/reservedIds.entity';

@Injectable()
export class ReservedIdsService {
    constructor(
        @InjectRepository(ReservedIdsEntity)
        private readonly reservedIdsRepository: Repository<ReservedIdsEntity>,
    ) {}

    async verifyReservedId(service_id: number, company_id: number) {
        const resp = await this.reservedIdsRepository.findOne({
            where: {
                service_id,
                company_id,
            }
        });

        if (!resp) {
            throw new HttpException('Service Order ID not found', HttpStatus.NOT_FOUND);
        }

        if (resp.status === 'Utilizado') {
            throw new HttpException('Service Order ID already used', HttpStatus.BAD_REQUEST);
        }

        return resp;

    }

    async getNewServiceOrderId(company_id: number) {
        const lastIdServiceOrder = await this.reservedIdsRepository.findOne({
            order: {
                id: 'DESC'
            },
            where: {
                company_id
            },
            select: ['service_id']
        });

        const service_id = lastIdServiceOrder ? lastIdServiceOrder.service_id + 1 : 1;

        const data = {
            company_id,
            service_id,
            status: 'Reservado',
        }

        const resp = await this.reservedIdsRepository.save(data);

        return {
            id: resp.id,
            service_id,
            company_id,
        }
    }

    async updateServiceOrderId(service_id: number, company_id: number) {
        const resp = await this.reservedIdsRepository.update({
            service_id,
            company_id,
        }, { status: 'Utilizado'});

        if (resp.affected === 0) {
            throw new HttpException('Service Order ID not found', HttpStatus.NOT_FOUND);
        }
        
        return {
            message: 'Service Order ID updated',
        }
    }

    async deteleServiceOrderId(service_id: number, company_id: number) {
        const resp = await this.reservedIdsRepository.delete({
            service_id,
            company_id,
        });

        if (resp.affected === 0) {
            throw new HttpException('Service Order ID not found', HttpStatus.NOT_FOUND);
        }

        return {
            message: 'Service Order ID deleted',
        }
    }

}