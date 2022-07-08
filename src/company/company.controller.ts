import { Body, Controller, Res, Post, Get, Req, UseGuards, Request } from '@nestjs/common';
import {Response } from 'express';
import { CompanyService } from './company.service';
import { companyDto } from './dto';
import { JwtAuthGuard } from '../utils/guards/jwt.guard';

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
