import { Body, Res, Post, Get, Req, UseGuards, Request, Controller } from '@nestjs/common';
import {Response } from 'express';
import { CompanyService } from './company.service';
import { companyDto, sendOtp, verifyOtp } from './dto';
import { JwtAuthGuard } from '../utils/guards/jwt.guard';
import { otpService } from './otp.service';

@Controller('company')
export class CompanyController {
    constructor(private companyService: CompanyService){}

    @Post('register')
    companyRegister(@Body() dto: companyDto, @Res({ passthrough: true }) res: Response) {
        return this.companyService.companyRegister(dto, res)
    }

    @UseGuards(JwtAuthGuard)
    @Get('check')
    authCheckG(@Request() req) {
        return req.user;
    }
}

@Controller('otp')
export class otpController {
    constructor(private otpService: otpService) { }
    
    @Post('mail/send')
    mailOtp(@Body() dto: sendOtp, @Res() res: Response) {
        return this.otpService.mailOtp(dto,res)
    }

    @Post('verify')
    verifyOtp(@Body() dto: verifyOtp, @Res() res: Response) {
        return this.otpService.verifyOtp(dto,res)
    }
}
