import { IsEmail, IsMobilePhone, IsNotEmpty, IsNumber } from "class-validator"

export class companyDto {
    @IsNotEmpty()
    cname: String;

    @IsEmail()
    @IsNotEmpty()
    cemail: String;

    @IsMobilePhone()
    @IsNotEmpty()
    cphone: String;

    address: String;
    logo_url: String;

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

    name: String;
    password: String;
    company_id: String;
}