import { Injectable } from '@nestjs/common';
import { TourDto } from './dto/tour.dto';


@Injectable()
export class TourService {
  create(tourDto: TourDto) {
    return 'This action adds a new tour';
  }

  findAll() {
    return `This action returns all tour`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tour`;
  }

  update(id: number, tourDto: TourDto) {
    return `This action updates a #${id} tour`;
  }

  remove(id: number) {
    return `This action removes a #${id} tour`;
  }
}
