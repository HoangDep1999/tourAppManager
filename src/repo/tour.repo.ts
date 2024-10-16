import { TourEntity } from "src/tour/entities/tour.entity";
import { BaseRepository } from "../repo/BaseRepository";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TourDto } from "src/tour/dto/tour.dto";

@Injectable()
export class TourRepository extends BaseRepository<TourEntity,Repository<TourEntity>, TourDto>
    {
    constructor(
        @InjectRepository(TourEntity)
        protected readonly repository: Repository<TourEntity>
    ){
        super(repository)
    }

    async findRelationById(id: number): Promise<TourEntity> {
        const tour =  await this.repository.findOne({where:{id}, relations:['guide', 'post']});
        const data = {
            tour: tour,
            guide: tour.guide,
            post: tour.post
        }
        return 
    }
}