import { Body, Controller, HttpException, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto, RegisterAlumniDto } from 'commons/commons';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {



    constructor(private  readonly  authService:  AuthService) {}
  
    
    @Post('/login')
    async login(@Body(ValidationPipe) credentials: AuthCredentialsDto): Promise<any> {

   
        const output = await this.authService.login(credentials);

        if(output.result) {

            const jwtSign = {
                id: output.result.id,
                ReferenceNbr : output.result.ReferenceNbr,
            };
    
            const token = await this.authService.jwtSignUser(jwtSign);
    
    
            return {
                success: true,
                user: output.result,
                token: token,
            };
    

        }else {
            return output;
        }


    }  


       
    @Post('/alumni-register')
    async alumniRegister(@Body() registerAlumni : RegisterAlumniDto): Promise<any> {


        const { account, profile, job_profile } = registerAlumni;


        const saveAccount = await this.authService.saveAccount(account);

        if(saveAccount)
        {
            profile.AccountID = saveAccount.id;
            const savedProfile = await this.authService.saveProfile(profile);

            if(savedProfile) {

                job_profile.ProfileID = savedProfile.id;
  
                // await this.authService.insertJobProfile(job_profile);

            }

        }


        return await this.authService.findOneAccount({ id : saveAccount.id })


    }

}
