import { IsString, MinLength, MaxLength, Matches, IsNotEmpty } from "class-validator";

export class AuthCredentialsDto {

    @IsString()
    @IsNotEmpty()
    ReferenceNbr : string;


    @IsNotEmpty()
    @IsString()
    Password : string;
    

}