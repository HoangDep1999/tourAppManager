import { Injectable } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';

@Injectable()
export class RoleService {
  create(roleDto: RoleDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all post`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, roleDto: RoleDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
