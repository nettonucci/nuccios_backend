import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { StockEntity } from "../../entities/stock.entity";

import { CompaniesService } from "../companies/service";

@Injectable()
export class StockService {
    constructor(
        @InjectRepository(StockEntity)
        private readonly stockRepository: Repository<StockEntity>,
        private readonly companiesService: CompaniesService
    ) {}

    async getByCompanyId(companyId: number): Promise<StockEntity[]> {
        return await this.stockRepository.find({ where: { company_id: companyId } });
    }

    async create(stock: StockEntity): Promise<StockEntity> {
        await this.companiesService.show(stock.company_id);
        
        return await this.stockRepository.save(stock);
    }

    async update(id: number, stock: StockEntity): Promise<StockEntity> {
        await this.stockRepository.update(id, stock);
        return await this.stockRepository.findOne({
            where: { id }
        });
    }

    async delete(id: number): Promise<void> {
        await this.stockRepository.delete(id);
    }
}