import { HttpException, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "src/repo/user.repo";
import { RoleRepository } from "src/repo/role.repo";
import { HttpStatus, Roles } from "src/global/global.enum";
import * as bcrypt from 'bcrypt';
import { UserEntity } from "src/user/entities/user.entity";
import { UserDto } from "src/user/dto/user.dto";

@Injectable()
export class AuthService{
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepository,
        @Inject('RoleRepository')
        private readonly roleRepository: RoleRepository,
        private jwtService: JwtService
    ){}
    

    async register(userDto: UserDto): Promise<UserEntity>{
        const customerRole = await this.roleRepository.findById(Roles.CUSTOMER)
        const user = await this.userRepository.findByString('email',userDto.email)
        const userPhone = await this.userRepository.findByString('phone',userDto.phone)
        if(user){
            throw new HttpException('Email đã được sử dụng' , HttpStatus.ERROR);
        }

        if(userPhone){
            throw new HttpException('SĐT đã được sử dụng' , HttpStatus.ERROR);
        }
        if (!userDto.password) {
            throw new HttpException('Mật khẩu không được để trống', HttpStatus.ERROR);
        }
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
         const newUser = this.userRepository.create({ ...userDto, password: hashedPassword });
        // const newUser = this.userRepository.create(userDto);
        (await newUser).roles = customerRole;
        const saveUser = await this.userRepository.saveEntity((await newUser));
        
        return saveUser
    }


    async login(userDto: UserDto): Promise<UserEntity |{ message: string; accessToken: string }>{
        const {email, password} = userDto;
        const user = await this.userRepository.findByString('email',email)
        if(!user){
            throw new HttpException('Email chưa được đăng ký' , HttpStatus.ERROR);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new HttpException('Sai mật khẩu' , HttpStatus.ERROR);
        }
        const payload = { 
            id: user.id
        };
        const accessToken = await this.jwtService.signAsync(payload,{
            secret:process.env.JWT_SECRET,
            expiresIn: '30s',
        })
        const data = {
            message: 'Đăng nhập thành công',
            accessToken
        };
        return data
        
    }


    
}