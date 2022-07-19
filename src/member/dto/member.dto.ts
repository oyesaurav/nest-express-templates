import { IsEmail, IsNotEmpty } from "class-validator";
import * as mongoose from 'mongoose'
export class memberDto {
    @IsEmail()
    @IsNotEmpty()
    email: String;

    name: String;
    password: String;
    company_id: String;
}
export class resetPassDto {
    email: String;

    name: String;
    
    @IsNotEmpty()
    password: String;

    company_id: String;
}

export class loginDto {
    @IsEmail()
    @IsNotEmpty()
    email: String;

    @IsNotEmpty()
    password: String;
}

export class newBlpanDto {
    @IsNotEmpty()
    t_id: String;
}

export class updateBplanDto {
    @IsNotEmpty()
    bplan_id: String;

    @IsNotEmpty()
    section_id: String;

    heading: String;
    body : Object
}

export class addSectionDto {
    @IsNotEmpty()
    t_id: String;

    content: {
        heading: String,
        body: Object
    }
}
export class changeBplanDto {
    @IsNotEmpty()
    bplan_id: String;

    content: [{
        heading: String,
        body : Object
    }]
}
export class getBplanDto {
    @IsNotEmpty()
    bplan_id: String;
}

export class newTempDTo {
    @IsNotEmpty()
    template_code: String;
    
    content: [{
        heading: String,
        body : Object
    }]
}