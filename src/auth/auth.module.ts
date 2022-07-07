import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { company, companyModel } from 'src/models/company.model';
import { member, memberModel } from 'src/models/member.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports:[MongooseModule.forFeature([{name: company.name, schema: companyModel}, {name: member.name, schema: memberModel}])],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
