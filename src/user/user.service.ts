import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserRepository } from 'src/repo/user.repo';
import { UserEntity } from './entities/user.entity';
import { HttpStatus, Roles } from 'src/global/global.enum';
import { RoleRepository } from 'src/repo/role.repo';


@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,

    @Inject('RoleRepository')
    private readonly roleRepository: RoleRepository
  ){}
  async create(userDto: UserDto): Promise<UserEntity>{
    if(userDto.email){
      const emailExists = await this.userRepository.findByString('email', userDto.email);
      if(emailExists) throw new HttpException('Email đã được sử dụng', HttpStatus.ERROR);
    }
    if(userDto.phone){
      const phoneExists = await this.userRepository.findByString('phone', userDto.phone);
      if(phoneExists) throw new HttpException('SĐT đã được sử dụng', HttpStatus.ERROR);
    }

    userDto.roles ? userDto.roles.id = Roles.CUSTOMER : null;

    return await this.userRepository.create(userDto);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
      return await this.userRepository.findById(id)
  }

  async update(id: number, userDto: Partial<UserDto>): Promise<UserEntity> {
    const userExist = await this.userRepository.findById(id);
    if(!userExist){
      throw new HttpException('Người dùng không tồn tại', HttpStatus.ERROR);
    }

    if (userDto.email) {
      const emailExists = await this.userRepository.findByString('email', userDto.email);
      if (emailExists) {
          if (emailExists.email !== userExist.email) {
              throw new HttpException('Email đã được sử dụng', HttpStatus.ERROR);
          }
      }
    }

    if (userDto.phone) {
      const phoneExists = await this.userRepository.findByString('phone', userDto.phone);
      if (phoneExists) {
          if (phoneExists.phone !== userExist.phone) {
              throw new HttpException('SĐT đã được sử dụng', HttpStatus.ERROR);
          }
      }
    }
    const defaultRole = await this.roleRepository.findAll();
    console.log(defaultRole);
    
    const roleExist = defaultRole.some(result => result.id === userDto.roles?.id)
    if(!roleExist) throw new HttpException('Role này không tồn tại', HttpStatus.ERROR);

    return this.userRepository.update(userExist.id, userDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
