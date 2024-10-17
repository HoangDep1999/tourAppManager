import { HttpException, Inject, Injectable } from '@nestjs/common';
import { TourDto } from './dto/tour.dto';
import { TourEntity } from './entities/tour.entity';
import { TourRepository } from 'src/repo/tour.repo';
import { UserRepository } from 'src/repo/user.repo';
import { PostRepository } from 'src/repo/post.repo';
import { HttpStatus } from 'src/global/global.enum';
import { AllExceptionsFilter } from 'src/helpers/http-exception.filter';

@Injectable()
export class TourService {
  constructor(
    @Inject('TourRepository')
    private readonly tourRepository: TourRepository,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    @Inject('PostRepository')
    private readonly postRepository: PostRepository,
  ){}
  async create(tourDto: TourDto) : Promise<TourEntity>{
    const guide = await this.userRepository.findById(Number(tourDto.guideId));
    const post = await this.postRepository.findById(Number(tourDto.postId));
    if (!guide || !guide.id) AllExceptionsFilter.getExceptionFilter(HttpStatus.ERROR, 'Hướng dẫn viên không tồn tại')

    if (!post || !post.id) AllExceptionsFilter.getExceptionFilter(HttpStatus.ERROR, 'Bài viết không tồn tại')
      
    const {id, firstname, lastname} = guide
    const {id:_id, name} = post
    const dataGuide = {id, firstname, lastname}
    const dataPost = {id, name}
    
    const tour = await this.tourRepository.create({
      ...tourDto,
      guide: dataGuide,
      post: dataPost,
    });
    return tour;
  }

  async findAll(): Promise<TourEntity[]> {
    return this.tourRepository.findAll();
  }

  findOne(id: number) {
    return this.tourRepository.findById(+id);
  }

  update(id: number, tourDto: TourDto) {
    return `This action updates a #${id} tour`;
  }

  remove(id: number) {
    return `This action removes a #${id} tour`;
  }
}
