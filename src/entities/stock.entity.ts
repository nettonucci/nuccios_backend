import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

import { CompaniesEntity } from './companies.entity';
import { ServiceOrderStockValuesEntity } from './serviceOrderStockValues.entity';

@Entity('stock')
export class StockEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    company_id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    quantity: string;

    @Column()
    price: string;

    @ManyToOne(type => CompaniesEntity, company => company.stock)
    @JoinColumn({ name: 'company_id' })
    company: CompaniesEntity;

    @OneToMany(type => ServiceOrderStockValuesEntity, stock => stock.stock)
    serviceOrderValues: ServiceOrderStockValuesEntity[];

    @CreateDateColumn({
        type: 'timestamp with time zone',
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
    })
    updated_at: Date;
}