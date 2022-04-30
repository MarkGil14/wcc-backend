import { Body, Controller, HttpException, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto, RegisterAlumniDto, Account } from 'commons/commons';
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
                account : output.result,
                profile : output.result.profile,
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
            profile.accountId = saveAccount.id;
            const savedProfile = await this.authService.saveProfile(profile);

            if(savedProfile) {

                job_profile.profileId = savedProfile.id;
  
                // await this.authService.insertJobProfile(job_profile);

            }

        }


        return await this.authService.findOneAccount({ id : saveAccount.id })


    }

    @Post('/reset-password')
    async resetPassword(@Body() refNbr : string): Promise<any> {
        
        const student = await Account.findOne({ where : { IsVerified : true, ReferenceNbr : refNbr  } });

        if(student) {
            student.Password = await this.makeid(8);
            await Account.save(student);
            return student.Password;
        }else{
            return false;
        }

    }

    async makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * 
            charactersLength));
       }
       return result;
    }

}
