import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { company, CompanyDoc } from 'src/models/company.model';
import { member, memberDoc } from 'src/models/member.model';
import { memberDto, resetPassDto } from './dto';
import * as jwt from 'jsonwebtoken';
import { transporter } from 'src/utils/mail.utils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(company.name) private readonly companyModel: Model<CompanyDoc>,
    @InjectModel(member.name) private readonly memberModel: Model<memberDoc>,
  ) {}

  async newPassword(dto: memberDto, res) {
    await this.memberModel
      .findOne({ email: dto.email })
      .exec()
      .then(async (userExist) => {
        if (!userExist)
          res.status(404).json({ message: 'User email does not exist' });
        else {
          const payload = {
            email: userExist.email,
            id: userExist._id,
          };
          const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15min',
          });
          const base_url = process.env.BASE_URL;
          const pw = userExist.password ? userExist.password.replace(/\//g, 'slash') : 999;
          const link = `${base_url}/member/reset-password/${userExist.id}/${token}/${pw}`;

          let mailoptions = {
            from: process.env.EMAIL,
            to: dto.email,
            subject: 'Request to change password',
            html: `<h2>You have requested to change your password</h2>
                    <h4>Please follow the below link to change your password. It can be used only 1 time before 15 min</h4>
                     <a href=${link}>Reset password</a>`,
          };
          transporter.sendMail(mailoptions, function (err, info) {
            if (err) {
              console.log(err)
              res.status(500).json({ message: err });
            } else {
              res.status(200).json({ message: 'Email with link sent' });
            }
          });
        }
      })
        .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: err,
        });
      });
  }

  async checkResetLink(param, res) {
    await this.memberModel
      .findById(param.id)
      .exec()
      .then(async (userExist) => {
        if (!userExist) res.status(404).json({ message: 'Invalid Id...' });
        if (userExist) {
          const pw = param.pw.replace(/slash/g, '/');
          jwt.verify(
            param.token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, user) => {
              if (err)
                res
                  .status(403)
                  .json({ message: 'The link is broken or it has expired' });
              if ((userExist.password && userExist.password === pw) || !userExist.password) {
                res.status(200).json({
                  message: 'Valid link',
                  user: user,
                });
              } else
                res
                  .status(403)
                  .json({ message: 'The link can be used one time only' });
            },
          );
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  }

  async resetPass(param, dto: resetPassDto, res) {
    await this.memberModel
      .findById(param.id)
      .exec()
      .then(async (userExist) => {
        if (!userExist) res.status(404).json({ message: 'Invalid Id...' });
        if (userExist) {
          const pw = param.pw.replace(/slash/g, '/');
          jwt.verify(
            param.token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, user) => {
              if (err) res.status(403).json({ message: 'The link is broken or it has expired' });
              if ((userExist.password && userExist.password === pw) || !userExist.password) {
                const hash = await bcrypt.hash(dto.password, 10);
                await this.memberModel.updateOne(
                    { _id: user.id },
                    { $set: { password: hash } },
                );
                res.status(200) .json({ message: 'password reset successful' });
              } else
                return res
                  .status(403)
                  .json({ message: 'The link can be used one time only' });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  }
}
