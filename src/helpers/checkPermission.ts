import { HttpException } from "@nestjs/common";
import { HttpStatus } from "src/global/global.enum";
import { UserEntity } from "src/user/entities/user.entity";

export class CheckPermission{
    static checkPermission(id:number, currentUser: UserEntity){
        if(id === currentUser.id || currentUser.roles.name === 'admin') return;
        throw new HttpException('Không có quyền chỉnh sửa', HttpStatus.FORBIDDEN);
    }

    static checkPermissionAdmin(id:number, currentUser: UserEntity){
        if(id === currentUser.id && currentUser.roles.name === 'admin'){
            return;
        }
        
        throw new HttpException(`Chỉ có admin mới được quyền sửa cập nhật role`, HttpStatus.FORBIDDEN);
    }
}