import { BaseRepository } from "./BaseRepository";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/entities/user.entity";
import { UserDto } from "src/user/dto/user.dto";
import { RoleEntity } from "src/role/entities/role.entity";
import { RoleDto } from "src/role/dto/role.dto";

@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity,Repository<RoleEntity>, RoleDto> 
    {
    constructor(
        @InjectRepository(RoleEntity)
        protected readonly repository: Repository<RoleEntity>
    ){
        super(repository)
    }
}