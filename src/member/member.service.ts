import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { company, CompanyDoc } from 'src/models/company.model';
import { member, memberDoc } from 'src/models/member.model';
import { memberDto } from './dto';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class MemberService {
    constructor(
        @InjectModel(company.name) private readonly companyModel: Model<CompanyDoc>,
        @InjectModel(member.name) private readonly memberModel: Model<memberDoc>,
    ) { }
    
    async newPassword(dto: memberDto) {
        
    }
}
