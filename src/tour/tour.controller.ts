import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourDto } from './dto/tour.dto';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  create(@Body() tourDto: TourDto) {
    return this.tourService.create(tourDto);
  }

  @Get()
  findAll() {
    return this.tourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() tourDto: TourDto) {
    return this.tourService.update(+id, tourDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tourService.remove(+id);
  }
}
