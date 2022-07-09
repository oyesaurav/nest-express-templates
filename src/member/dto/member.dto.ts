import { IsEmail, IsNotEmpty } from "class-validator";

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

    content: [{
        heading: String,
        body : String
    }]
}
export class getBplanDto {
    @IsNotEmpty()
    bplan_id: String;

    content: [{
        heading: String,
        body : String
    }]
}