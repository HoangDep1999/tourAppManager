import { HttpException } from "@nestjs/common";

export class AllExceptionsFilter{
    static getExceptionFilter(statusCode: number, errorMessage: string){
        throw new HttpException(
            {
                statusCode: statusCode,
                message: errorMessage,
            },
            statusCode
        );
    }
}