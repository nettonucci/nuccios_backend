import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany
} from 'typeorm';
import { CompaniesEntity } from './companies.entity';
import { UsersEntity } from './users.entity';
import { ClientsEntity } from './clients.entity';
import { PublicCommentsEntity } from './publicComents.entity';
import { PrivateCommentsEntity } from './privateComents.entity';

@Entity('service_orders')
export class ServiceOrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    company_id: number;

    @Column()
    user_id: number;

    @Column()
    client_id: number;

    @Column()
    service_id: number;

    @Column()
    device_type: string;

    @Column()
    device_brand: string;

    @Column()
    device_model: string;

    @Column()
    device_serial_number: string;

    @Column()
    device_accessories: string;

    @Column()
    device_defect: string;

    @Column()
    device_observation: string;

    @Column({
        nullable: true
    })
    device_password: string;

    @Column()
    status: string;

    @ManyToOne(type => CompaniesEntity, company => company.users)
    @JoinColumn({ name: 'company_id' })
    company: CompaniesEntity;

    @ManyToOne(type => UsersEntity, user => user.serviceOrders)
    @JoinColumn({ name: 'user_id' })
    user: UsersEntity;

    @ManyToOne(type => ClientsEntity, client => client.serviceOrders)
    @JoinColumn({ name: 'client_id' })
    client: ClientsEntity;

    @OneToMany(type => PublicCommentsEntity, publicComment => publicComment.serviceOrder)
    publicComments: PublicCommentsEntity[];

    @OneToMany(type => PrivateCommentsEntity, privateComment => privateComment.serviceOrder)
    privateComments: PrivateCommentsEntity[];

    @CreateDateColumn({
        type: 'timestamp with time zone',
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
    })
    updated_at: Date;
}