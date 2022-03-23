import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Account, JobProfile, Profile } from 'commons/commons';
import { FindCondition, FindManyOptions, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class StudentService  extends TypeOrmCrudService<Account>{


    constructor(
        @InjectRepository(Account) repo,
        
        @InjectRepository(Profile)
        private profileRepo : Repository<Profile>,

        @InjectRepository(JobProfile)
        private jobProfileRepo : Repository<JobProfile>,

        ) {
        super(repo);
    }



    async findProfile(query : any) {
        return await this.profileRepo.findOne(query, { relations : ['job_profiles'] });
    }

    
    async findJobProfile(query : any) {
      return await this.jobProfileRepo.findOne(query);
  }


    async saveAccount(account : Account) : Promise<Account> {
        return await this.repo.save(account);
    }


    async saveProfile(profile : Profile) : Promise<Profile> {
        return await this.profileRepo.save(profile)
      }
  
  
      async saveJobProfile(jobProfile : JobProfile) : Promise<JobProfile> {
        return await this.jobProfileRepo.save(jobProfile)
      }
  
      async insertJobProfile(jobProfile : QueryDeepPartialEntity<JobProfile>) : Promise<any> {
        return await this.jobProfileRepo.insert(jobProfile)
      }

}
