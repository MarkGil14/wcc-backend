import { Body, Controller, Get, Param, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Crud, CrudController } from "@nestjsx/crud";
import { Announcement, AnnouncementImage } from 'commons/commons';
import { AnnouncementService } from './announcement.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path'

@Crud({
    model: {
      type: Announcement,
    },
    query: {
      join: {
          announcement_images: {
              eager: true,
          },
      },
    },
    params: {
      id: {
        field: 'id',
        type: 'uuid'
      },
    },
})
@Controller('announcement')
export class AnnouncementController implements CrudController<Announcement>  {


    constructor(public service: AnnouncementService) {}



    @Post('/images/:announcementId') 
    @UseInterceptors(FilesInterceptor('file[]', 5 , {
      storage: diskStorage({
        destination: './announcement-images'
        , filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 8)).toString(8)).join('')
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`)
          }
        })
    }))  
    async uploadImages(@UploadedFiles() files, @Param('announcementId') announcementId, @Res() res) {

      const savedAnnouncementImg : AnnouncementImage[] = [];

      console.log(files);

      for (let index = 0; index < files.length; index++) {
        const file = files[index];

        const announcementImg = new AnnouncementImage();
        announcementImg.announcementId = announcementId;
        announcementImg.ImageUrl = file['filename'];
        const img = await this.service.saveAnnouncementImage(announcementImg);
        savedAnnouncementImg.push(img)        
      }


      return savedAnnouncementImg;



    }

    @Get('/image/:filepath')
    seeUploadedFile(@Param('filepath') file,
    @Res() res){
        return res.sendFile(file, {root: 'announcement-images'})
    }

    

}
