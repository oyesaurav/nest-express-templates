import { IsEmail, IsNotEmpty } from "class-validator";

export class memberDto {
    @IsEmail()
    @IsNotEmpty()
    email: String;

    name: String;
    password: String;
    company_id: String;
}