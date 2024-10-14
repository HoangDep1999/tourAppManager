import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TourModule } from './tour/tour.module';
import { PostModule } from './post/post.module';
import { UserEntity } from './user/entities/user.entity';
import { TourEntity } from './tour/entities/tour.entity';
import { PostEntity } from './post/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tour-app-clone',
    entities: [UserEntity, TourEntity, PostEntity],
    synchronize: true,
    }), UserModule, TourModule, PostModule,
  ],
})
export class AppModule {}
