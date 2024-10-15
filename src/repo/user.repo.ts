import { BaseRepository } from "../repo/BaseRepository";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { UserDto } from "src/user/dto/user.dto";

@Injectable()
export class UserRepository extends BaseRepository<UserEntity,Repository<UserEntity>, UserDto> 
    {
    constructor(
        @InjectRepository(UserEntity)
        protected readonly repository: Repository<UserEntity>
    ){
        super(repository)
    }
}