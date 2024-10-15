import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from 'src/repo/role.repo';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [RoleController],
  providers: [RoleService,
    {
      provide: 'RoleRepository',
      useClass: RoleRepository,
    },
  ],
  exports: [RoleService, 'RoleRepository'],
})
export class RoleModule {}
