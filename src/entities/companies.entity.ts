import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('companies')
export class CompaniesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome_empresa: string;

    @Column()
    possui_cpnj: boolean;

    @Column({
        unique: true,
        nullable: true
    })
    cnpj: string;

    @Column()
    ramo: string;

    @Column({
        nullable: true
    })
    logo: string;

    @Column()
    nome_proprietario: string;

    @Column()
    cpf: string;

    @Column()
    email: string;

    @Column()
    celular: string;

    @Column()
    senha: string;

    @Column({
        unique: true,
        nullable: true,
    })
    resetPasswordToken!: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}