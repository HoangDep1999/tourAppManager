import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { UserRepository } from "src/repo/user.repo";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { RoleModule } from "src/role/role.module";
import { LoggerMiddleware } from "src/middlewares/logger.middleware";

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

export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}