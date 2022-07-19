import { IsNotEmpty } from "class-validator";

export class sendOtp {
    @IsNotEmpty()
    identifier: String;
}

export class verifyOtp {
    @IsNotEmpty()
    identifier: String;

    @IsNotEmpty()
    otp: Number;
}