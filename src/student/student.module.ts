import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Job, JobProfile, Profile } from 'commons/commons';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
    imports : [
        TypeOrmModule.forFeature([
          Account,
          Profile,
          JobProfile,
          Job,
        ]),  
      ],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {
    
}
