import { Body, Controller, Post } from "@nestjs/common";
import { UserDto } from "src/user/dto/user.dto";
import { UserEntity } from "src/user/entities/user.entity";
import { AuthService } from "./auth.service";
import { LoginDto } from "src/user/dto/login.dto";

@Controller('auth')
export class AuthController{
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('/register')
    async register(@Body() userDto: UserDto): Promise<UserEntity> {
        return this.authService.register(userDto);
    }

    @Post('/login')
    async login(@Body() loginDto: LoginDto): Promise<UserEntity |{ message: string; accessToken: string }> {
        return this.authService.login(loginDto);
    }
}