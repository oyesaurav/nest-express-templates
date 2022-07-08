import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { company, companyModel } from 'src/models/company.model';
import { member, memberModel } from 'src/models/member.model';
import { JwtStrategy } from 'src/utils/strategies/jwt.strategy';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: company.name, schema: companyModel }, { name: member.name, schema: memberModel }]),
   PassportModule,
  ],
  controllers: [MemberController],
  providers: [MemberService, JwtStrategy]
})
export class MemberModule {}
