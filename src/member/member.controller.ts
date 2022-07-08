import { Body, Controller, Post } from '@nestjs/common';
import { memberDto } from './dto';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
    constructor(private memberService: MemberService) { }
    
    @Post('changePass')   // when member is registered by the company, company doesn't provide password for member
        // so during member fisrt login, generate new password, link will be mailed to create password
    chnagePass(@Body() dto: memberDto) {         
        return this.memberService.newPassword(dto)
    }
}
