import { Exclude } from "class-transformer";
import { ModelEntity } from "src/global/general.entity";
import { Roles } from "src/global/global.enum";
import { RoleEntity } from "src/role/entities/role.entity";
import { TourEntity } from "src/tour/entities/tour.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('users')
export class UserEntity extends ModelEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstname:string;

    @Column()
    lastname:string;

    @Unique(['email'])
    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string

    @Unique(["phone"])
    @Column()
    phone: string

    @Column({default: true})
    isActive: boolean;

    @ManyToOne(() => RoleEntity, (role) => role.users)
    roles: RoleEntity;

    @OneToMany(()=>TourEntity, (tour)=>tour.guide)
    users: UserEntity[]

}
