import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber } from "class-validator"

export class companyDto {
    @IsNotEmpty()
    cname: String;

    @IsEmail()
    @IsNotEmpty()
    cemail: String;

    @IsMobilePhone()
    @IsNotEmpty()
    cphone: Number;

    address: String;
    logo_url: String;
    domain: String;

    @IsNotEmpty()
    members: [{
            pname: String;
            pemail: String;
    }]

}

export class memberDto {
    @IsEmail()
    @IsNotEmpty()
    email: String;

    password: String;
    company_id: String;
}