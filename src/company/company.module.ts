import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { verifyToken } from 'src/middleware/auth.middleware';
import { company, companyModel } from 'src/models/company.model';
import { member, memberModel } from 'src/models/member.model';
import { CompanyController, otpController } from './company.controller';
import { CompanyService } from './company.service';
import { JwtStrategy } from '../utils/strategies/jwt.strategy';
import { otpService } from './otp.service';
import { temp, tempModel } from 'src/models/temp.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: company.name, schema: companyModel },
    { name: member.name, schema: memberModel },
    {name: temp.name, schema: tempModel}
  ]),
   PassportModule,
  ],
  controllers: [CompanyController, otpController],
  providers: [CompanyService, JwtStrategy, otpService]
})
export class CompanyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(verifyToken)
    .forRoutes('company/check')
  }
}
