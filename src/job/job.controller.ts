import { Controller, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Job } from 'commons/commons';
import { Crud, CrudController } from "@nestjsx/crud";
import { JobService } from './job.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Express } from 'express'

@Crud({
    model: {
      type: Job,
    },
    params: {
      id: {
        field: 'id',
        type: 'uuid'
      },
    },
})
@Controller('job')
export class JobController implements CrudController<Job>  {

    constructor(public service: JobService) {}


    
    @Post('/logo/:id') 
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
    async uploadCompanyLogo(@UploadedFile() file : Express.Multer.File, @Param('id') id, @Res() res) {
      console.log(file)

      const job = await Job.findOne({ id });
      job.CompanyLogo = file.filename;
      return await Job.save(job);

    }



    
    @Post('/banner/:id') 
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
    async uploadCompanyBanner(@UploadedFile() file, @Param('id') id, @Res() res) {
  
      console.log(file)
      const job = await Job.findOne({ id });

      job.JobImage = file['filename'];
      return await Job.save(job);

    }

}
