import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { company, CompanyDoc } from 'src/models/company.model';
import { companyDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
       @InjectModel(company.name) private readonly companyModel: Model<CompanyDoc>,
    ) { }
    
    async companyRegister(dto: companyDto, res) {
        
    }
}
