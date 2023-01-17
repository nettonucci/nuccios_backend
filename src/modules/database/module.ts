import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesEntity } from '../../entities/companies.entity';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'nucci',
        password: '123',
        database: 'postgres',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
    })]
})
export class DatabaseModule {}