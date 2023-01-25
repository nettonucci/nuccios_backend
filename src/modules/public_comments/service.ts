import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

import { PublicCommentsEntity } from "../../entities/publicComents.entity";
import { CompaniesService } from "../companies/service";
import { UsersService } from "../users/service";

@Injectable()
export class PublicCommentsService {
    constructor(
        @InjectRepository(PublicCommentsEntity)
        private readonly publicCommentsRepository: Repository<PublicCommentsEntity>,
        private readonly companiesService: CompaniesService,
        private readonly usersService: UsersService,
    ) {}
    
    async getByServiceIdAndCompanyId(service_id: number, company_id: number): Promise<PublicCommentsEntity[]> {
        await this.companiesService.show(company_id);

        const publicComments = await this.publicCommentsRepository.find({
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

    async getByCompanyId(company_id: number): Promise<PublicCommentsEntity[]> {
        await this.companiesService.show(company_id);

        const publicComments = await this.publicCommentsRepository.find({
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

    async create(data: PublicCommentsEntity): Promise<PublicCommentsEntity> {
        await this.companiesService.show(data.company_id);

        await this.usersService.show(data.user_id);

        const publicComment = this.publicCommentsRepository.create(data);

        await this.publicCommentsRepository.save(publicComment);

        return publicComment;
    }

    async update(id: number, data: PublicCommentsEntity): Promise<PublicCommentsEntity> {

        const { comment } = data;

        await this.companiesService.show(data.company_id);

        await this.usersService.show(data.user_id);

        const publicComment = await this.publicCommentsRepository.findOne({ 
            where: {
                id,
            },
         });

        await this.publicCommentsRepository.update(id, {
            comment,
        });

        return publicComment;
    }

    async delete(id: number): Promise<any> {
        const publicComment = await this.publicCommentsRepository.findOne({ 
            where: {
                id,
            },
         });

        await this.publicCommentsRepository.delete(id);

        return { 'message': 'Comment deleted successfully' };
    }

}