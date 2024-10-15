import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "src/repo/user.repo";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { RoleModule } from "src/role/role.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserEntity } from "src/user/entities/user.entity";
import { UserModule } from "src/user/user.module";
@Module({
    imports: [TypeOrmModule.forFeature([UserEntity]), RoleModule, UserModule,
    JwtModule.register({
        global: true
      })],
    controllers:[AuthController],
    providers:[AuthService,JwtService,],
    exports: [AuthService],
})

export class AuthModule{}