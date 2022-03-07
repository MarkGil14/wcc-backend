import { Injectable } from '@nestjs/common';
import { Announcement } from 'commons/commons';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnnouncementService  extends TypeOrmCrudService<Announcement> {


    constructor(@InjectRepository(Announcement) repo) {
        super(repo);
      }





}
