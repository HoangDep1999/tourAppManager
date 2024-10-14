import { ModelEntity } from "src/global/general.entity";
import { TourEntity } from "src/tour/entities/tour.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')
export class PostEntity extends ModelEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string

    // @ManyToOne(()=> LocationEntity)
    // @JoinColumn({
    //     name:'locationId', referencedColumnName: 'id'
    // })
    // locationGroupId: LocationEntity

    @OneToMany(()=>TourEntity, tour=>tour.post)
    tours: TourEntity[]
}
