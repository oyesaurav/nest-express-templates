import { Body, Controller, Res, Post, Get } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { companyDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('company/register')
    companyRegister(@Body() dto: companyDto, @Res({ passthrough: true }) res: Response) {
        
    }
}
