import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, Put, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { CurrentUser } from './decorators/currentuser.decorator';
import { UserEntity } from './entities/user.entity';
import { RoleGuard } from 'src/role/role.guard';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  
  @Post('/create-user')
  async create(@Body(new ValidationPipe()) userDto: UserDto) : Promise<UserEntity>{
    return this.userService.create(userDto);
  }

  @Get('/current-user')
  @UseGuards(new RoleGuard(['admin']))
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() currentUser: UserEntity){
    return currentUser;
  }
  
  @Get()
  @UseGuards(new RoleGuard(['customer']))
  @UseGuards(AuthGuard)
  findAll() {
    console.log('Second');
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDto: UserDto): Promise<UserEntity>{
    return this.userService.update(+id, userDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
