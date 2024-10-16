import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { RoleEntity } from "src/role/entities/role.entity";

export class UserDto {
    @IsNotEmpty({message:'Firstname không được để trống'})
    @IsString()
    firstname:string;

    @IsNotEmpty({message:'Lastname không được để trống'})
    @IsString()
    lastname:string;

    @IsNotEmpty({message:'Email không được để trống'})
    @IsEmail()
    email: string;

    @IsNotEmpty({message:'Password không được để trống'})
    @IsString()
    password: string

    @IsNotEmpty({message:'SĐT không được để trống'})
    @IsString()
    phone: string

    roles?: RoleEntity
    
    isActive: boolean;

}
