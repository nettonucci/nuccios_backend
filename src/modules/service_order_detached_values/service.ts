import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ServiceOrderDetachedValuesEntity } from "src/entities/serviceOrdersDetachedValues.entity";

import { UpdateServiceOrderPriceService } from "../utils/update_service_order_price/service";

@Injectable()
export class ServiceOrderDetachedValuesService {
    constructor(
        @InjectRepository(ServiceOrderDetachedValuesEntity)
        private readonly serviceOrderDetachedValuesRepository: Repository<ServiceOrderDetachedValuesEntity>,
        private readonly updateServiceOrderPriceService: UpdateServiceOrderPriceService,
    ) {}

    async getByServiceIdAndCompanyId(service_id: number, company_id: number) {
        return await this.serviceOrderDetachedValuesRepository.find({
            where: {
                service_id,
                company_id
            },
            select: {
                user:
                {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            relations: ['user'],
        });
    }

    async getByCompanyId(company_id: number) {
        return await this.serviceOrderDetachedValuesRepository.find({
            where: {
                company_id
            },
            select: {
                user:
                {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            relations: ['user'],
        });
    }

    async create(data: any) {

        const serviceOrderStockValues = this.serviceOrderDetachedValuesRepository.create(data);

        await this.serviceOrderDetachedValuesRepository.save(serviceOrderStockValues);

        await this.updateServiceOrderPriceService.updatePrice(data.service_id, data.company_id, "add", parseInt(data.value));

        return serviceOrderStockValues;
    }

    async delete(id: number): Promise<void> {
        const serviceOrderStockValues = await this.serviceOrderDetachedValuesRepository.findOne({
            where: { id },
        });

        if (!serviceOrderStockValues) {
            throw new HttpException('Service Order detached Values not found', HttpStatus.NOT_FOUND);
        }


        await this.serviceOrderDetachedValuesRepository.delete(id);

        await this.updateServiceOrderPriceService.updatePrice(serviceOrderStockValues.service_id, serviceOrderStockValues.company_id, "subtract", serviceOrderStockValues.value);

        return
    }

}