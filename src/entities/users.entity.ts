import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';
import { CompaniesEntity } from './companies.entity';
import { ServiceOrderEntity } from './serviceOrder.entity';
import { PublicCommentsEntity } from './publicComents.entity';
import { PrivateCommentsEntity } from './privateComents.entity';

@Entity('users')
export class UsersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    company_id: number;

    @Column()
    name: string;

    @Column()
    email: string;

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
        nullable: true
    })
    passwordResetToken!: string;

    @ManyToOne(type => CompaniesEntity, company => company.users)
    @JoinColumn({ name: 'company_id' })
    company: CompaniesEntity;

    @OneToMany(type => ServiceOrderEntity, serviceOrder => serviceOrder.user)
    serviceOrders: ServiceOrderEntity[];

    @OneToMany(type => PublicCommentsEntity, publicComment => publicComment.user)
    publicComments: PublicCommentsEntity[];

    @OneToMany(type => PrivateCommentsEntity, privateComment => privateComment.user)
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

