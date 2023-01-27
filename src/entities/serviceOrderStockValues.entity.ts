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
import { StockEntity } from './stock.entity';

@Entity('serviceOrderStockValues')
export class ServiceOrderStockValuesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    service_id: number;

    @Column()
    user_id: number;

    @Column()
    company_id: number;

    @Column()
    stock_id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(type => ServiceOrderEntity, serviceOrder => serviceOrder.stockValues)
    @JoinColumn({ name: 'service_id' })
    serviceOrder: ServiceOrderEntity;

    @ManyToOne(type => UsersEntity, user => user.serviceOrderStockValues)
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity;

    @ManyToOne(type => CompaniesEntity, company => company.serviceOrderStockValues)
    @JoinColumn({ name: 'company_id' })
    company: CompaniesEntity;

    @ManyToOne(type => StockEntity, stock => stock.serviceOrderValues)
    @JoinColumn({ name: 'stock_id' })
    stock: StockEntity;
}