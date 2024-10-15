import { BaseRepository } from "../repo/BaseRepository";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PostEntity } from "src/post/entities/post.entity";
import { PostDto } from "src/post/dto/post.dto";

@Injectable()
export class PostRepository extends BaseRepository<PostEntity,Repository<PostEntity>, PostDto> 
    {
    constructor(
        @InjectRepository(PostEntity)
        protected readonly repository: Repository<PostEntity>
    ){
        super(repository)
    }
}