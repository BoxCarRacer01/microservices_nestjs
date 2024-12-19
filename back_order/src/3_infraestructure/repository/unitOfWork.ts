import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericRepository } from "./baseRepository";
import { DataSource, QueryRunner, Repository } from "typeorm";
import { Orders } from "src/4_core/entities/orders";

@Injectable()
export class UnitOfWork {
    constructor(
        @InjectRepository(Orders) private readonly _ordersRepository: Repository<Orders>
        , private readonly entityManager: DataSource
    ) { }

    orderRepository(): GenericRepository<Orders> {
        return new GenericRepository<Orders>(this._ordersRepository.target, this._ordersRepository.manager);
    }

    async createQueryRunner(): Promise<QueryRunner> {
        const queryRunner = this.entityManager.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        return queryRunner;
    }

    async rollbackTransaction(queryRunner) {
        await queryRunner.rollbackTransaction();
    }

    async commitTransaction(queryRunner) {
        await queryRunner.commitTransaction();
    }

    async releaseQueryRunner(queryRunner) {
        await queryRunner.release();
    }
}