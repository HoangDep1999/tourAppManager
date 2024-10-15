import { ModelEntity } from "src/global/general.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class RoleEntity extends ModelEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string

    @OneToMany(()=>UserEntity, user=>user.roles)
    users: UserEntity[]
}
