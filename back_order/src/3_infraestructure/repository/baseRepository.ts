import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class GenericRepository<T> extends Repository<T> {

    async add(entity: DeepPartial<T>): Promise<T> {
        const newEntity = this.create(entity);
        return await this.save(newEntity);
    }

    async addList(entities: DeepPartial<T>[]): Promise<T[]> {
        const newEntities = entities.map(entity => this.create(entity));
        return await this.save(newEntities);
    }

    async getById(id: string): Promise<T | undefined> {
        const options: any = { where: { id: id } };
        return await this.findOne(options);
    }

    async getAll(): Promise<T[]> {
        return await this.find();
    }

    async updateEntity(entity: DeepPartial<T>): Promise<T | undefined> {
        return await this.save(entity);
    }

    async deleteEntity(id: any): Promise<void> {
        await this.delete(id);
    }

}