import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostRepository } from 'src/repo/post.repo';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
  providers: [PostService,
    {
      provide: 'PostRepository',
      useClass: PostRepository,
    },
  ],
  exports: [PostService, 'PostRepository'],
})
export class PostModule {}
