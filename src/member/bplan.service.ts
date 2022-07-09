import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { company, CompanyDoc } from 'src/models/company.model';
import { member, memberDoc } from 'src/models/member.model';
import {getBplanDto, loginDto, memberDto, newBlpanDto, resetPassDto, updateBplanDto } from './dto';
import { template, templateDoc } from 'src/models/template.model';
import { bplan, bplanDoc } from 'src/models/bplan.model';

@Injectable()
export class BplanService {
    constructor(
        @InjectModel(company.name) private readonly companyModel: Model<CompanyDoc>,
        @InjectModel(member.name) private readonly memberModel: Model<memberDoc>,
        @InjectModel(template.name) private readonly templateModel: Model<templateDoc>,
        @InjectModel(bplan.name) private readonly bplanModel : Model<bplanDoc>
    ) { }
    
    async getAllBplans(user,res) {
        await this.bplanModel.find({ c_id: user.company_id }).exec()
        .then(async (bplans) => {
            res.status(200).json({
                message: bplans.length,
                bplans
            })
        })
        .catch(err => {
            res.status(500).json({
              message: err,
            });
        })
    }

    async newBplan(dto: newBlpanDto,user,res) {
        await this.bplanModel.findById(dto.t_id).exec()
        .then(async (template) => {
            const newBplan = new this.bplanModel({
                t_id: template._id,
                c_id: user.company_id,
                ...template
            })
            await newBplan.save()
            .then(saved => {
                res.status(201).json({
                    message: "New Business Plan created from the template",
                    saved
                })
            })
        })
        .catch(err => {
            res.status(500).json({
              message: err,
            });
        })
    }

    async getBplan(dto: getBplanDto, user,res ) {
        await this.bplanModel.findById(dto.bplan_id).exec()
        .then(async (bplan) => {
            res.status(200).json({
                message: "Here is the content of the Bplan",
                bplan
            })
        })
        .catch(err => {
            res.status(500).json({
              message: err,
            });
        })
    }
    
    async updateBplan(dto: updateBplanDto, user, res) {
        await this.bplanModel.updateOne({ _id: dto.bplan_id, "content._id": dto.section_id},
            {$set : {"content.$" : dto.content}}
        )
        .then(async (bplan) => {
            res.status(200).json({
                message: "The section of the Bplan is updated"
            })
        })
        .catch(err => {
            res.status(500).json({
              message: err,
            });
        })
    }
}