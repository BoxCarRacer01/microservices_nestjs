import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericRepository } from "./baseRepository";
import { DataSource, QueryRunner, Repository } from "typeorm";
import { Products } from "src/4_core/entities/products";


@Injectable()
export class UnitOfWork {
    constructor(
        @InjectRepository(Products) private readonly _productsRepository: Repository<Products>
        , private readonly entityManager: DataSource
    ) { }

    productsRepository(): GenericRepository<Products> {
        return new GenericRepository<Products>(this._productsRepository.target, this._productsRepository.manager);
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