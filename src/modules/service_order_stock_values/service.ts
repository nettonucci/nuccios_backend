import { HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ServiceOrderStockValuesEntity } from "../../entities/serviceOrderStockValues.entity";

import { StockService } from "../stock/service";

import { UpdateServiceOrderPriceService } from "../utils/update_service_order_price/service";


@Injectable()
export class ServiceOrderStockValuesService {
    constructor(
        @InjectRepository(ServiceOrderStockValuesEntity)
        private readonly serviceOrderStockValuesRepository: Repository<ServiceOrderStockValuesEntity>,
        private readonly stockService: StockService,
        private readonly updateServiceOrderPriceService: UpdateServiceOrderPriceService,
    ) {}

    async getByServiceIdAndCompanyId(service_id: number, company_id: number) {
        return await this.serviceOrderStockValuesRepository.find({
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
                stock: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                }
            },
            relations: ['user', 'stock'],
        });
    }

    async getByCompanyId(company_id: number) {
        return await this.serviceOrderStockValuesRepository.find({
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
                stock: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                }
            },
            relations: ['user', 'stock'],
        });
    }

    async create(data: any) {
        const stock = await this.stockService.show(data.stock_id);

        if (stock.company_id !== data.company_id) {
            throw new HttpException('Stock not found', HttpStatus.NOT_FOUND);
        }

        const quantity = parseInt(stock.quantity) - 1;

        if (quantity < 0) {
            throw new HttpException('Not stock enough', HttpStatus.NOT_FOUND);
        }

        const serviceOrderStockValues = this.serviceOrderStockValuesRepository.create(data);

        await this.serviceOrderStockValuesRepository.save(serviceOrderStockValues);

        const stockToUpdate = {
            quantity: quantity.toString(),
        }

        await this.stockService.update(data.stock_id, stockToUpdate);

        await this.updateServiceOrderPriceService.updatePrice(data.service_id, data.company_id, "add", parseInt(stock.price));

        return serviceOrderStockValues;
    }

    async update(id: number, data: any) {
        await this.serviceOrderStockValuesRepository.update(id, data);
        return await this.serviceOrderStockValuesRepository.findOne({
            where: { id }
        });
    }

    async delete(id: number): Promise<void> {
        const serviceOrderStockValues = await this.serviceOrderStockValuesRepository.findOne({
            where: { id },
        });

        if (!serviceOrderStockValues) {
            throw new HttpException('Service Order Stock Values not found', HttpStatus.NOT_FOUND);
        }

        const stock = await this.stockService.show(serviceOrderStockValues.stock_id);

        const quantity = parseInt(stock.quantity) + 1;

        const stockToUpdate = {
            quantity: quantity.toString(),
        }

        await this.serviceOrderStockValuesRepository.delete(id);

        await this.stockService.update(serviceOrderStockValues.stock_id, stockToUpdate);

        await this.updateServiceOrderPriceService.updatePrice(serviceOrderStockValues.service_id, serviceOrderStockValues.company_id, "subtract", parseInt(stock.price));

        return
    }
}