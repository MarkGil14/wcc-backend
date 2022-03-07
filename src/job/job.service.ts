import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'commons/commons';

@Injectable()
export class JobService  extends TypeOrmCrudService<Job>{

    constructor(@InjectRepository(Job) repo) {
        super(repo);
    }
}
