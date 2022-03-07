import { Module } from '@nestjs/common';
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
  ],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
