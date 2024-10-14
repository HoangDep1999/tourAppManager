import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserRepository } from "src/repo/user.repo";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers:[UserController],
    providers:[UserService,
        {
            provide: 'UserRepository',
            useClass: UserRepository,
          },
    ],
    exports: [UserService, 'UserRepository'],
})

export class UserModule{}