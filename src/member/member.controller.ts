import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { memberDto, resetPassDto } from './dto';
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
}
