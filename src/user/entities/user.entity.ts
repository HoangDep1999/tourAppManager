import { Exclude } from "class-transformer";
import { ModelEntity } from "src/global/general.entity";
import { TourEntity } from "src/tour/entities/tour.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

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

    @Column({default: true})
    isActive: boolean;

    @OneToMany(()=>TourEntity, (tour)=>tour.guide)
    users: UserEntity[]
}
