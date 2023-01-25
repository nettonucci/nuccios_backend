import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

import { PrivateCommentsEntity } from "../../entities/privateComents.entity";
import { CompaniesService } from "../companies/service";
import { UsersService } from "../users/service";

@Injectable()
export class PrivateCommentsService {
    constructor(
        @InjectRepository(PrivateCommentsEntity)
        private readonly privateCommentsRepository: Repository<PrivateCommentsEntity>,
        private readonly companiesService: CompaniesService,
        private readonly usersService: UsersService,
    ) {}
    
    async getByServiceIdAndCompanyId(service_id: number, company_id: number): Promise<PrivateCommentsEntity[]> {
        await this.companiesService.show(company_id);

        const publicComments = await this.privateCommentsRepository.find({
            where: {
                service_id,
                company_id,
            },
            select: {
                user:
                {
                    id: true,
                    name: true,
                    email: true,
                }
            },
            relations: ['user'],
        });

        return publicComments;
    }

    async getByCompanyId(company_id: number): Promise<PrivateCommentsEntity[]> {
        await this.companiesService.show(company_id);

        const publicComments = await this.privateCommentsRepository.find({
            where: {
                company_id,
            },
            select: {
                user:
                {
                    id: true,
                    name: true,
                    email: true,
                }
            },
            relations: ['user'],
        });

        return publicComments;
    }

    async create(data: PrivateCommentsEntity): Promise<PrivateCommentsEntity> {
        await this.companiesService.show(data.company_id);

        await this.usersService.show(data.user_id);

        const publicComment = this.privateCommentsRepository.create(data);

        await this.privateCommentsRepository.save(publicComment);

        return publicComment;
    }

    async update(id: number, data: PrivateCommentsEntity): Promise<PrivateCommentsEntity> {

        const { comment } = data;

        await this.companiesService.show(data.company_id);

        await this.usersService.show(data.user_id);

        const publicComment = await this.privateCommentsRepository.findOne({ 
            where: {
                id,
            },
         });

        await this.privateCommentsRepository.update(id, {
            comment,
        });

        return publicComment;
    }

    async delete(id: number): Promise<any> {
        const publicComment = await this.privateCommentsRepository.findOne({ 
            where: {
                id,
            },
         });

        await this.privateCommentsRepository.delete(id);

        return { 'message': 'Comment deleted successfully' };
    }

}