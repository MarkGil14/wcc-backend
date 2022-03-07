import { Controller } from '@nestjs/common';
import { Job } from 'commons/commons';
import { Crud, CrudController } from "@nestjsx/crud";
import { JobService } from './job.service';


@Crud({
    model: {
      type: Job,
    },
})
@Controller('job')
export class JobController implements CrudController<Job>  {

    constructor(public service: JobService) {}

}
