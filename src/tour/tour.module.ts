import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TourEntity } from './entities/tour.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { PostEntity } from 'src/post/entities/post.entity';
import { UserModule } from 'src/user/user.module';
import { PostModule } from 'src/post/post.module';
import { TourRepository } from 'src/repo/tour.repo';

@Module({
  imports:[TypeOrmModule.forFeature([TourEntity, UserEntity, PostEntity]),
  PostModule, UserModule,
  ],
  controllers: [TourController],
  providers: [TourService,
    {
      useClass: TourRepository,
      provide: 'TourRepository',
    }
  ],
})
export class TourModule {}
