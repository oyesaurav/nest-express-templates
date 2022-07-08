import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { company, CompanyDoc } from 'src/models/company.model';
import { companyDto } from './dto';
import * as jwt from 'jsonwebtoken';
import {member, memberDoc } from 'src/models/member.model';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(company.name) private readonly companyModel: Model<CompanyDoc>,
    @InjectModel(member.name) private readonly memberModel: Model<memberDoc>,
  ) {}

  async companyRegister(dto: companyDto, res) {
    await this.companyModel.findOne({ $or: [{ cemail: dto.cemail }, { cphone: dto.cphone }] }).exec()
      .then(async (foundComp) => {
        if (foundComp) res.status(409).json({ message: "Company credentils already exist" })
        else {
          const newComp = new this.companyModel({
            ...dto,
            domain: dto.cemail.split("@")[1]
          })
        await newComp.save()
          .then(async (saved) => {
            await Promise.all(dto.members.map(async member => {
              const newMember = new this.memberModel({
                email: member.pemail,
                name: member.pname,
                company_id: saved._id
              })
              await newMember.save()
            }))
            res.status(201).json({
              message: "Company saved",
              company: saved
            })
          })
      }
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          message: err,
        });
      })
  }

  generateTokens() {
    const accessToken = jwt.sign(
      {
        msg: 'access',
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15min',
      },
    );
    const refreshToken = jwt.sign(
      {
        msg: 'refresh',
      },
      process.env.REFRESH_TOKEN_SECRET,
    );
    // res.set('Authorization', 'Bearer ' + accessToken);

    // res.cookie('AT', accessToken);
    // res.cookie('RT', refreshToken);
  }
}
