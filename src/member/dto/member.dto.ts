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