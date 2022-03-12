import { Body, Controller, Get, Post } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { Account } from 'commons/commons';
import { StudentService } from './student.service';


@Crud({
    model: {
      type: Account,
    },
    query: {
        join: {
            profile: {
                eager: true,
            },
            'profile.job_profiles' : {},
        },
      },
})
@Controller('student')
export class StudentController implements CrudController<Account>  {


    constructor(public service : StudentService) {}



    /**
     * api method to confirm.activate the account of the pending alumni
     * @param account 
     */
    @Post('/confirm-verify') 
    async confirmVerify(@Body() account : Account) {

        account.IsVerified = true;
        account.isActive = true;
        return await this.service.saveAccount(account);

    }


      /**
     * api method to inactive the account of the pending alumni
     * @param account 
     */
       @Post('/inactive-account') 
       async inactiveAccount(@Body() account : Account) {
   
           account.IsVerified = false;
           account.isActive = false;
           return await this.service.saveAccount(account);
   
       }
   

}
