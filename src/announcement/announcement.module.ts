import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Announcement, AnnouncementImage } from 'commons/commons';
import { AnnouncementController } from './announcement.controller';
import { AnnouncementService } from './announcement.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Announcement, AnnouncementImage]),
    MulterModule.register({
      dest: './announcement-images',
    })
  ],  
  
  controllers: [AnnouncementController],
  providers: [AnnouncementService]
})
export class AnnouncementModule {}
