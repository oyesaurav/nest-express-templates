import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { verifyToken } from 'src/middleware/auth.middleware';
import { company, companyModel } from 'src/models/company.model';
import { member, memberModel } from 'src/models/member.model';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { JwtStrategy } from '../utils/strategies/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: company.name, schema: companyModel }, { name: member.name, schema: memberModel }]),
   PassportModule,
  ],
  controllers: [CompanyController],
  providers: [CompanyService, JwtStrategy]
})
export class CompanyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(verifyToken)
    .forRoutes('company/check')
  }
}
