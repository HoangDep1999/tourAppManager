import { ModelEntity } from "src/global/general.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tours')
export class TourEntity extends ModelEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    numbersGuest: number;

    @Column()
    thumbnail: string;

    @Column()
    document: string;

    @ManyToOne(() => UserEntity, (user)=> user.id)
    guide: UserEntity;

    @ManyToOne(()=> PostEntity, (post)=>post.id)
    post: PostEntity;
}
