import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TourDto {

    @IsDate()
    @IsNotEmpty()
    @Type(()=> Date)
    startDate: Date;

    @IsDate()
    @IsNotEmpty()
    @Type(()=> Date)
    endDate: Date;

    @IsNotEmpty()
    @IsNumber()
    numbersGuest: number;

    @IsNotEmpty({message:'Hình ảnh không được để trống'})
    @IsString()
    thumbnail: string;

    @IsNotEmpty({message:'Tài liệu không được để trống'})
    @IsString()
    document: string;

    @IsNotEmpty({message:'Hướng dẫn viên không được để trống'})
    @IsNumber()
    guideId: number;

    @IsNotEmpty({message:'Bài viết không được để trống'})
    @IsNumber()
    postId: number;

    guide?: { id: number; firstname: string; lastname: string };
    post?: { id: number; name: string; };
}
