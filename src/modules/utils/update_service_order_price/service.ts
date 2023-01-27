import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ServiceOrderEntity } from "../../../entities/serviceOrder.entity";


@Injectable()
export class UpdateServiceOrderPriceService {
    constructor(
        @InjectRepository(ServiceOrderEntity)
        private readonly serviceOrdersRepository: Repository<ServiceOrderEntity>,
    ) {}

        async updatePrice(service_id: number, company_id: number, operator: string, value: number): Promise<ServiceOrderEntity> {

        const serviceOrderToUpdate = await this.serviceOrdersRepository.findOne({
            where: {
                service_id,
                company_id,
            },
        });
        
        if (!serviceOrderToUpdate) {
            throw new HttpException('Service Order not found', HttpStatus.NOT_FOUND);
        }

        if(operator === 'add') {
            serviceOrderToUpdate.total_price = serviceOrderToUpdate.total_price + value;
        } else if(operator === 'subtract') {
            serviceOrderToUpdate.total_price = serviceOrderToUpdate.total_price - value;
            if (serviceOrderToUpdate.total_price < 0) {
                serviceOrderToUpdate.total_price = 0;
            }
        }

        await this.serviceOrdersRepository.save(serviceOrderToUpdate);

        return serviceOrderToUpdate;
    }
}