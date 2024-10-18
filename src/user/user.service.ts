import { Inject, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserRepository } from 'src/repo/user.repo';
import { UserEntity } from './entities/user.entity';
import { HttpStatus, Roles } from 'src/global/global.enum';
import { RoleRepository } from 'src/repo/role.repo';
import { CurrentUser } from './decorators/currentuser.decorator';
import { CheckPermission } from 'src/helpers/checkPermission';
import { AllExceptionsFilter } from 'src/helpers/http-exception.filter';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,

    @Inject('RoleRepository')
    private readonly roleRepository: RoleRepository
  ){}
  async create(userDto: UserDto): Promise<UserEntity>{
    await this.checkValidateParam(userDto.email, 'email', 'Email đã được sử dụng')
    await this.checkValidateParam(userDto.phone, 'phone', 'SĐT đã được sử dụng')
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    if(!userDto.roles){
      userDto.roles = new RoleEntity();
      userDto.roles.id = Roles.CUSTOMER;
    }else{
      userDto.roles.id = null;
    }
    const newUser = await this.userRepository.create({ ...userDto, password: hashedPassword });
    newUser.roles.id = userDto.roles.id
    return await this.userRepository.saveEntity(newUser)
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
      return await this.userRepository.findById(id)
  }

  async update(id: number, userDto: Partial<UserDto>, @CurrentUser() currentUser: UserEntity): Promise<UserEntity> {

    const userExist = await this.userRepository.findById(id);
    if(!userExist){
      AllExceptionsFilter.getExceptionFilter(HttpStatus.ERROR, 'Người dùng không tồn tại')
    }
    CheckPermission.checkPermission(id, currentUser)
    
    if(userDto.email){
      if (userDto.email !== userExist.email) {
        await this.checkValidateUpdate(userDto.email, userExist.email, 'email', 'Email đã được sử dụng');
      }
      AllExceptionsFilter.getExceptionFilter(HttpStatus.BAD_REQUEST, 'Email đang đăng nhập không được đổi')
    }

    await this.checkValidateUpdate(userDto.phone, userExist.phone, 'phone', 'SĐT đã được sử dụng')

    const defaultRole = await this.roleRepository.findAll();
    
    if(userDto.roles){
      CheckPermission.checkPermissionAdmin(id, currentUser);
      const roleExist = defaultRole.some(result => result.id === userDto.roles?.id)
      if(!roleExist) AllExceptionsFilter.getExceptionFilter(HttpStatus.ERROR, 'Role này không tồn tại')
    }else{
      userDto.roles = userExist.roles
    }

    return this.userRepository.update(userExist.id, userDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async checkValidateUpdate(value1: string, value2: string, key:string, errorMessage: string){
    const valueEntityExist = await this.userRepository.findByString(key, value1);
    if (valueEntityExist) {
        if (valueEntityExist[key] !== value2) {
          AllExceptionsFilter.getExceptionFilter(HttpStatus.BAD_REQUEST, errorMessage)
        }
    }
  }

  async checkValidateParam(value1: string, key:string, errorMessage: string){
    const valueEntityExist = await this.userRepository.findByString(key, value1);
    if (valueEntityExist) AllExceptionsFilter.getExceptionFilter(HttpStatus.BAD_REQUEST, errorMessage);
} 
  
}
