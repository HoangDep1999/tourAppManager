import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/repo/user.repo';
import { UserEntity } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository
  ){}
  async create(userDto: UserDto): Promise<UserEntity>{
    
    return;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<UserEntity> {
      return await this.userRepository.findById(id)
  }

  update(id: number, userDto: UserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
