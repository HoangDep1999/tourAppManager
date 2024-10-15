import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { RoleEntity } from "src/role/entities/role.entity";

export class UserDto {
    @IsNotEmpty()
    @IsString()
    firstname:string;

    @IsNotEmpty()
    @IsString()
    lastname:string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    phone: string

    roles?: RoleEntity
    
    isActive: boolean;

}
