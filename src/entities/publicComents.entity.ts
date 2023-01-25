import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

import { CompaniesEntity } from './companies.entity';
import { UsersEntity } from './users.entity';
import { ServiceOrderEntity } from './serviceOrder.entity';

@Entity('public_comments')
export class PublicCommentsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    service_id: number;

    @Column()
    company_id: number;

    @Column()
    user_id: number;

    @Column()
    comment: string;

    @CreateDateColumn({
        type: 'timestamp with time zone',
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
    })
    updated_at: Date;

    @ManyToOne(type => CompaniesEntity, company => company.id)
    @JoinColumn({ name: 'company_id' })
    company: CompaniesEntity;

    @ManyToOne(type => UsersEntity, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity;

    @ManyToOne(type => ServiceOrderEntity, serviceOrder => serviceOrder.id)
    @JoinColumn({ name: 'service_id' })
    serviceOrder: ServiceOrderEntity;
}