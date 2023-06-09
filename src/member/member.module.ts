import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { verifyToken } from 'src/middleware/auth.middleware';
import { storage } from 'src/middleware/upload.middleware';
import { bplan, bplanModel } from 'src/models/bplan.model';
import { company, companyModel } from 'src/models/company.model';
import { member, memberModel } from 'src/models/member.model';
import { template, templateModel } from 'src/models/template.model';
import { JwtStrategy } from 'src/utils/strategies/jwt.strategy';
import { BplanService } from './bplan.service';
import { BplanController, fileController, MemberController } from './member.controller';
import { MemberService } from './member.service';
import * as multer from 'multer'

@Module({
  imports: [MongooseModule.forFeature([{ name: company.name, schema: companyModel },
    { name: member.name, schema: memberModel }, { name: template.name, schema: templateModel },
    {name: bplan.name, schema: bplanModel}
  ]),
   PassportModule,
  ],
  controllers: [MemberController, BplanController, fileController],
  providers: [MemberService, JwtStrategy, BplanService]
})
export class MemberModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(verifyToken)
    .forRoutes()
    
    consumer
    .apply(multer({storage}).single("file"))
    .forRoutes('file/upload')
  }
}
