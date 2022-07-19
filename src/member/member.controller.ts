import { Body, Controller, Get, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Response } from 'express';
import * as mongoose from 'mongoose';
import { JwtAuthGuard } from 'src/utils/guards/jwt.guard';
import { BplanService } from './bplan.service';
import { addSectionDto, changeBplanDto, getBplanDto, loginDto, memberDto, newBlpanDto, newTempDTo, resetPassDto, updateBplanDto } from './dto';
import { MemberService } from './member.service';
const grid = require('gridfs-stream')
@Controller('member')
export class MemberController {
    constructor(private memberService: MemberService) { }
    
    // when member is registered by the company, company doesn't provide password for member
    // so during member fisrt login, generate new password, link will be mailed to create password
    @Post('newPass')   // to send request to server to mail the link to create new password
    newPass(@Body() dto: memberDto, @Res() res: Response) {    // request body - email
        return this.memberService.newPassword(dto,res)
    }

    // to check the validity of the link - 15min, one time use. Need to call on page load
    @Get('reset-password/:id/:token/:pw') 
    checkLink(@Param() param, @Res() res: Response){
        return this.memberService.checkResetLink(param,res)
    }
    // to reset the password of the member
    @Post('reset-password/:id/:token/:pw') // request body - password
    resetpass(@Param() param, @Body() dto: resetPassDto , @Res() res: Response){
        return this.memberService.resetPass(param,dto,res)
    }

    @Post('login')
    memberLogin(@Body() dto: loginDto, @Res() res: Response) {
        return this.memberService.memberLogin(dto, res)
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    memberLogout(@Res() res: Response) {
        return this.memberService.memberLogout(res)
    }

    @UseGuards(JwtAuthGuard)
    @Get('alltemplates')
    getAlltemplates(@Res() res: Response) {
        return this.memberService.getAlltemplates(res)
    }
}

@Controller('bplan')
export class BplanController {
    constructor(private bplanService: BplanService) { }
    
    @UseGuards(JwtAuthGuard)
    @Get('all')
    getBplans(@Request() req, @Res() res: Response) {
        return this.bplanService.getAllBplans(req.user,res)
    }

    @UseGuards(JwtAuthGuard)
    @Post('new')
    newBplans(@Request() req, @Res() res: Response, @Body() dto : newBlpanDto) {
        return this.bplanService.newBplan(dto,req.user,res)
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    getBplan(@Request() req, @Res() res: Response, @Body() dto : getBplanDto) {
        return this.bplanService.getBplan(dto,req.user,res)
    }

    @UseGuards(JwtAuthGuard)
    @Post('')
    updateBplan(@Request() req, @Res() res: Response, @Body() dto : updateBplanDto) {
        return this.bplanService.updateBplan(dto,req.user,res)
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('/temp/addsec')
    addSection(@Request() req, @Res() res: Response, @Body() dto : addSectionDto) {
        return this.bplanService.addsectionBplan(dto, req.user, res)
    }

    @UseGuards(JwtAuthGuard)
    @Post('entire')
    updateEntireBplan(@Request() req, @Res() res: Response, @Body() dto: changeBplanDto) {
        return this.bplanService.changeBplan(dto, req.user, res)
    }

    @UseGuards(JwtAuthGuard)
    @Post('newtemplate')
    newtemplate(@Res() res: Response, @Body() dto : newTempDTo) {
        return this.bplanService.newtemplate(dto,res)
    }
}

@Controller('file')
export class fileController{
    private gfs: any
    private gridfsBucket: any
    constructor(@InjectConnection() private readonly connection: mongoose.Connection) { 
        this.gridfsBucket = new mongoose.mongo.GridFSBucket(this.connection.db, {
            bucketName: 'photos'
        })
     }

    @Post('upload')
    uploadFile(@Request() req, @Res() res: Response) {
        if (req.file === undefined) res.status(404).json({message: "No file choosen"})
        else {
            const file = `http://localhost:4000/file/${req.file.filename}`;
            return res.json({
                message: "File uploaded successfully",
                url: file,
            });
        }
    }

    @Get(':filename')
    async viewFile(@Param() param, @Res() res: Response) {
        
        // this.gfs = grid(mongoose.connection.db, mongoose.mongo)
        // this.gfs.collection('photos')
        try {
            // const file = await this.gfs.files.findOne({ filename: param.filename })
            const readStream = this.gridfsBucket.openDownloadStreamByName(param.filename)
            return readStream.pipe(res)
        }
        catch (err) {
            console.log(err)
            res.status(500).json({message:err})
        }
    }
}