import { Controller } from '@nestjs/common';
import { Crud, CrudController } from "@nestjsx/crud";
import { Announcement } from 'commons/commons';
import { AnnouncementService } from './announcement.service';

@Crud({
    model: {
      type: Announcement,
    },
})
@Controller('announcement')
export class AnnouncementController implements CrudController<Announcement>  {


    constructor(public service: AnnouncementService) {}


}
