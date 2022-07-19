import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { temp, tempDoc } from 'src/models/temp.model';
import { sendOtp, verifyOtp } from './dto';
import { transporter } from 'src/utils/mail.utils';

@Injectable()
export class otpService {
  constructor(
    @InjectModel(temp.name) private readonly tempModel: Model<tempDoc>,
  ) {}

  async mailOtp(dto: sendOtp, res) {
    const otp = Math.floor(100000 + Math.random() * 900000);
    let time = new Date();
    let expireIn = time.setMinutes(time.getMinutes() + 3);
    // send mail with defined transport object
    const mailOptions = {
      from: '"Verify your email" <prcess.env.EMAIL> ',
      to: dto.identifier,
      subject: 'Verify your Email',
      html:
        '<h3>OTP for account verification is </h3>' +
        "<h1 style='font-weight:bold;'>" +
        otp +
        '</h1>', // html body
    };

    await this.tempModel
      .findOne({ identifier: dto.identifier })
      .exec()
      .then(async (findtemp) => {
        if (!findtemp) {
            const newtemp = new this.tempModel({
              identifier: dto.identifier,
              otp: otp,
              expiresIn: expireIn,
            });
            await newtemp.save().then(async (saved) => {
                transporter.sendMail(mailOptions, function (err, info) {
                    if (!err) {
                      res.status(200).json({ message: 'Email with link sent' });
                    } else {
                        console.log(err)
                        res.status(500).json({ message: err });
                    }
                })
            })
          } else {
            await this.tempModel.updateOne(
                { identifier: dto.identifier },
                { $set: { otp: otp, expiresIn: expireIn } },
              )
              .then(() => {
                transporter.sendMail(mailOptions, function (err, info) {
                    if (!err) {
                      res.status(200).json({ message: 'Email with link sent' });
                    } else {
                        console.log(err)
                        res.status(500).json({ message: err });
                    }
                })
              })
          }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: err,
        });
      });
  }

  async verifyOtp(dto: verifyOtp, res) {
    let time = new Date();
    const findtemp = await this.tempModel.findOne({
      identifier: dto.identifier,
    });
    if (findtemp) {
      if (findtemp.otp == dto.otp && findtemp.expiresIn > time.getMinutes()) {
        await this.tempModel.deleteOne({ identifier: dto.identifier });
        res.status(200).json({ message: 'Email verified' });
      } else res.status(403).json({ message: 'Invalid OTP' });
    } else res.status(404).json({ message: 'Please resend OTP' });
  }
}
