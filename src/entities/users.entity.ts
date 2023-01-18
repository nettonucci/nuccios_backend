import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

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

    @Column({
        nullable: true
    })
    passwordResetExpires!: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

