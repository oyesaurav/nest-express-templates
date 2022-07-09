import { Body, Controller, Get, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';
import { BplanService } from './bplan.service';
import { getBplanDto, loginDto, memberDto, newBlpanDto, resetPassDto, updateBplanDto } from './dto';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
    constructor(private memberService: MemberService) { }
    
    // when member is registered by the company, company doesn't provide password for member
    // so during member fisrt login, generate new password, link will be mailed to create password
    @Post('newPass')   // to send request to server to mail the link to create new password
    newPass(@Body() dto: memberDto, @Res() res: Response) {    // request body - email
        return this.memberService.newPassword(dto,res)
    }

    // to check the validity of the link - 15min, one time use. Need to call on page load
    @Get('reset-password/:id/:token/:pw') 
    checkLink(@Param() param, @Res() res: Response){
        return this.memberService.checkResetLink(param,res)
    }
    // to reset the password of the member
    @Post('reset-password/:id/:token/:pw') // request body - password
    resetpass(@Param() param, @Body() dto: resetPassDto , @Res() res: Response){
        return this.memberService.resetPass(param,dto,res)
    }

    @Post('login')
    memberLogin(@Body() dto: loginDto, @Res() res: Response) {
        return this.memberService.memberLogin(dto, res)
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    memberLogout(@Res() res: Response) {
        return this.memberService.memberLogout(res)
    }

    @UseGuards(JwtAuthGuard)
    @Get('alltemplates')
    getAlltemplates(@Res() res: Response) {
        return this.memberService.getAlltemplates(res)
    }
}

@Controller('bplan')
export class BplanController {
    constructor(private bplanService: BplanService) { }
    
    @UseGuards(JwtAuthGuard)
    @Get('all')
    getBplans(@Request() req, @Res() res: Response) {
        return this.bplanService.getAllBplans(req.user,res)
    }

    @UseGuards(JwtAuthGuard)
    @Post('new')
    newBplans(@Request() req, @Res() res: Response, @Body() dto : newBlpanDto) {
        return this.bplanService.newBplan(dto,req.user,res)
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    getBplan(@Request() req, @Res() res: Response, @Body() dto : getBplanDto) {
        return this.bplanService.getBplan(dto,req.user,res)
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    updateBplan(@Request() req, @Res() res: Response, @Body() dto : updateBplanDto) {
        return this.bplanService.updateBplan(dto,req.user,res)
    }
}