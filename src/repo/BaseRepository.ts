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
    async findById(id: number): Promise<T> {
        return this.repository.findOne({ where: { id } as FindOptionsWhere<BaseEntity>});
    }
    async update(data: Partial<T>, id: number): Promise<T> {
        throw new Error("Method not implemented.");
    }
   async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}