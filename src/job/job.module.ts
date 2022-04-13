import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Job, JobProfile, Profile } from 'commons/commons';
import { JobController } from './job.controller';
import { JobService } from './job.service';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      Account,
      Profile,
      JobProfile,
      Job,
    ]),  
    MulterModule.register({
      dest: './announcement-images',
    })

  ],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
