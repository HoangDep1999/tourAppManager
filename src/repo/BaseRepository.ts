import { Injectable } from "@nestjs/common";
import { BaseEntity, FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export abstract class BaseRepository<T extends BaseEntity, R extends Repository<T>, D>{
    constructor(
        protected readonly repository: R
    ){}
    async findAll(): Promise<T[]> {
        return await this.repository.find();
    }
    async create(data: D): Promise<T> { 
        return await this.repository.save(data as any);
    }

    async saveEntity(data: T): Promise<T> { 
        return await this.repository.save(data);
    }

    async findById(id: number): Promise<T> {
        return this.repository.findOne({ 
            where: { id } as FindOptionsWhere<BaseEntity>,
            relations: ['roles'],
        });
    }

    async findByString(fieldName: string, value: string): Promise<T> {
        return this.repository.findOne({
            where: { [fieldName]: value } as FindOptionsWhere<BaseEntity>,
        });
    }
    async update(id: number, data: Partial<D>): Promise<T> {
        const entity = await this.findById(id);
        const newEntity = {...entity, ...data}
        return this.repository.save(newEntity as any)
    }
   async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}