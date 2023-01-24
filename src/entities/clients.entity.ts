import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { CompaniesEntity } from './companies.entity';
import { ServiceOrderEntity } from './serviceOrder.entity';

@Entity('clients')
export class ClientsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    company_id: number;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    phone: string;

    @Column()
    cellphone: string;

    @Column()
    address: string;

    @Column()
    email: string;

    @ManyToOne(type => CompaniesEntity, company => company.users)
    @JoinColumn({ name: 'company_id' })
    company: CompaniesEntity;

    @OneToMany(type => ServiceOrderEntity, serviceOrder => serviceOrder.client)
    serviceOrders: ServiceOrderEntity[];

    @CreateDateColumn({
        type: 'timestamp with time zone',
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
    })
    updated_at: Date;
}