import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Job, JobProfile, Profile } from 'commons/commons';
import { ImportValidation } from 'commons/commons/class/import-validation';
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
        MulterModule.register({
          dest: './announcement-images',
        })
    
      ],
  controllers: [StudentController],
  providers: [StudentService, ImportValidation]
})
export class StudentModule {
    
}
