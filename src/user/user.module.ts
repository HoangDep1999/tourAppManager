import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserRepository } from "src/repo/user.repo";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { RoleModule } from "src/role/role.module";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule],
    controllers:[UserController],
    providers:[UserService,JwtService,
      {
        provide: 'UserRepository',
        useClass: UserRepository,
      },
    ],
    exports: [UserService, 'UserRepository'],
})

export class UserModule{}