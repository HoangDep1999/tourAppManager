import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TourModule } from './tour/tour.module';
import { PostModule } from './post/post.module';
import { UserEntity } from './user/entities/user.entity';
import { TourEntity } from './tour/entities/tour.entity';
import { PostEntity } from './post/entities/post.entity';
import * as dotenv from 'dotenv';
import { RoleEntity } from './role/entities/role.entity';
import { AuthModule } from './auth/auth.module';
dotenv.config();


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE_NAME,
    entities: [UserEntity, TourEntity, PostEntity, RoleEntity],
    synchronize: true,
    }), UserModule, TourModule, PostModule, AuthModule
  ],
})
export class AppModule {}
