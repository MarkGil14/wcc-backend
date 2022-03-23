import { IsNotEmpty, IsOptional } from "class-validator";

export class ImportExcelDto {
    
    
    @IsNotEmpty()
    Data : any[];     

    @IsNotEmpty()
    Module : string;     

    @IsOptional()
    User : any;     

    Filename: string;
}
