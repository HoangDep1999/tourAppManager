import { Injectable, CanActivate, ExecutionContext, HttpStatus, HttpException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        // 1. Get token from headers
        const token = request.headers.authorization?.split(' ')[1] ?? [];
        console.log(token);
        
        // 2. jwtVerify validate token
        if(!token){
            throw new HttpException('Token khong ton tai', HttpStatus.UNAUTHORIZED)
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET
                }
            );
            console.log(payload);
            // 3. Search user in DB by payload
            
            const user = await this.userService.findOne(payload.id)
            if(!user){
                throw new HttpException('Người dùng không tồn tại', HttpStatus.NOT_FOUND)
            }
            // 4. Assign user into request
            request.currentUser = user;
        } catch (error) {
            throw new UnauthorizedException('Invalid token or expired');
        }
        return true;
    }
}