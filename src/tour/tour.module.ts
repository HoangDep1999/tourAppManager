import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourEntity } from './entities/tour.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostEntity } from 'src/post/entities/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([TourEntity, UserEntity, PostEntity])],
  controllers: [TourController],
  providers: [TourService],
})
export class TourModule {}
