import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourDto } from './dto/tour.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  create(@Body() tourDto: TourDto) {
    return this.tourService.create(tourDto);
  }

  @UseGuards(AuthGuard)
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
