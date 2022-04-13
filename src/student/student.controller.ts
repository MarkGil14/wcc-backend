import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Crud, CrudController } from '@nestjsx/crud';
import { Account, JobProfile, Profile } from 'commons/commons';
import { ImportValidation } from 'commons/commons/class/import-validation';
import { ImportExcelDto } from 'commons/commons/dto/import-excel.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AccountHeaderImport, AlumniHeaderImport, ProfileHeaderImport } from './import-header';
import { ImportModules } from './import-module';
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


    constructor(public service : StudentService,
        public importValidation: ImportValidation,
        ) {}



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


 
    @Post('/process-upload') 
    async import(
        @Body(ValidationPipe) importDto : ImportExcelDto,
    ) {
  
   
       
      const parseData: any[] = importDto.Data;
      const header = parseData[0];
  
  
      header.push('createdBy');
      header.push('updatedBy');

      const savedImportDataArr : any[] = [];
      
      let errors: any[] = [];
      /**
       * header of csv in row 1 / index 0
       */
      try {
        for (const importModule in ImportModules) {
          if (Object.prototype.hasOwnProperty.call(ImportModules, importModule)) {
            const module = ImportModules[importModule];
            switch (importDto.Module) {
              case module.moduleName:
                errors = await this.importValidation.validateRows(
                  importDto.Data,
                  module.moduleHeader,
                );
                break;
              default:
                break;
            }
          }
        }
  
        /**
         * if there's an error in data
         * then dont proceed
         */
        if (errors.length > 0) {
          return {
            errors,
          };
        } 
  
        for (let i = 1; i < parseData.length; i++) {

 

          const dataRow = parseData[i];
          const dataHeader = header;
  
          const account = new Account();
          
          const profile = new Profile();
  
          for (const key in dataHeader) {
            if (Object.prototype.hasOwnProperty.call(dataHeader, key)) {
              const header = dataHeader[key];
  

              const headerFieldResult = await this.importValidation.getUploadField(
                header,
                AccountHeaderImport,
              );
  
              if (headerFieldResult.isFound) {
                account[
                  headerFieldResult.headerField
                ] = await this.importValidation.serializeUploadData(
                  dataRow[key],
                  headerFieldResult.type,
                  headerFieldResult.defaultValue,
                );
              } else {
                /**
                 * find match in service field
                 */
                const serviceFieldResult = await this.importValidation.getUploadField(
                  header,
                  ProfileHeaderImport,
                );
  
                if (serviceFieldResult.isFound) {
                  /**
                   * this service data was seperated by comma
                   */
                   profile[
                    serviceFieldResult.headerField
                  ] = await this.importValidation.serializeUploadData(
                    dataRow[key],
                    serviceFieldResult.type,
                    serviceFieldResult.defaultValue,
                  );
                }  
              }
  
  
  
            }
  
          }
 


          account.AccountType = 'Alumni';
          account.Password = account.ReferenceNbr
          account.IsVerified = false;
          account.isActive = true;
          const savedAccount = await this.service.saveAccount(account);


        if(savedAccount)
        {
            profile.accountId = savedAccount.id;
            const savedProfile = await this.service.saveProfile(profile);
            
        }
 

        savedImportDataArr.push(account);

        }


   
        return savedImportDataArr;
   
        
      } catch (error) {
        return { error : error.message };
      }
    }

 
    @Post('/update-job-profile') 
    async updateJobProfile(@Body() jobProfile : JobProfile) {

 
        const currentJobProfile = await this.service.findJobProfile({ profileId : jobProfile.profileId });

        if(currentJobProfile) {
            jobProfile.id = currentJobProfile.id;
            const savedJobProfile = await this.service.saveJobProfile(jobProfile);
        }else {
            delete jobProfile.id;
            const savedJobProfile = await this.service.saveJobProfile(jobProfile);
        }

        return await this.service.findProfile({ id : jobProfile.profileId });

    }



    
    @Post('/change-avatar/:id') 
    @UseInterceptors(FileInterceptor('file', {
      storage: diskStorage({
        destination: './announcement-images'
        , filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
    }))  
    async uploadAvatar(@UploadedFile() file : Express.Multer.File, @Param('id') id) {

      const profile = await Profile.findOne({ id });
      profile.Avatar = file.filename;
      return await Profile.save(profile);

    }




}
