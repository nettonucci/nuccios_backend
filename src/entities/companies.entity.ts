import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { ClientsEntity } from './clients.entity';
import { UsersEntity } from './users.entity';
import { ServiceOrderEntity } from './serviceOrder.entity';

@Entity('companies')
export class CompaniesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    company_name: string;

    @Column()
    has_cnpj: boolean;

    @Column({
        unique: true,
        nullable: true
    })
    cnpj: string;

    @Column()
    branch: string;

    @Column({
        nullable: true
    })
    logo: string;

    @Column()
    owner_name: string;

    @Column()
    cpf: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    cellphone: string;

    @Column()
    password: string;

    @Column({
        default: false
    })
    active: boolean;

    @Column({
        nullable: true,
    })
    activeAccountToken!: string;

    @Column({
        unique: true,
        nullable: true,
    })
    resetPasswordToken!: string;

    @OneToMany(type => UsersEntity, user => user.company)
    users: UsersEntity[];

    @OneToMany(type => ClientsEntity, client => client.company)
    clients: ClientsEntity[];

    @OneToMany(type => ServiceOrderEntity, serviceOrder => serviceOrder.company)
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