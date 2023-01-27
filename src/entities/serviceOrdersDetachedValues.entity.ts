import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { CompaniesEntity } from './companies.entity';
import { UsersEntity } from './users.entity';
import { ServiceOrderEntity } from './serviceOrder.entity';

@Entity('serviceOrderDetachedValues')
export class ServiceOrderDetachedValuesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    service_id: number;

    @Column()
    user_id: number;

    @Column()
    company_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    value: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => ServiceOrderEntity, serviceOrder => serviceOrder.detachedValues)
    @JoinColumn({ name: 'service_id' })
    serviceOrder: ServiceOrderEntity;

    @ManyToOne(type => UsersEntity, user => user.serviceOrderDetachedValues)
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity;

    @ManyToOne(type => CompaniesEntity, company => company.serviceOrderDetachedValues)
    @JoinColumn({ name: 'company_id' })
    company: CompaniesEntity;
}