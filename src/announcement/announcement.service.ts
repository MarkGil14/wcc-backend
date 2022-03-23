import { Injectable } from '@nestjs/common';
import { Announcement, AnnouncementImage } from 'commons/commons';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnnouncementService  extends TypeOrmCrudService<Announcement> {


    constructor(
      @InjectRepository(Announcement) repo,
      @InjectRepository(AnnouncementImage)
      private announcementImageRepo : Repository<AnnouncementImage>,

    ) {
        super(repo);
      }




    async saveAnnouncementImage(announcementImg : AnnouncementImage) {
      return await this.announcementImageRepo.save(announcementImg);      
    }



}
