import { Injectable } from '@nestjs/common';
import { Account, AuthCredentialsDto, JobProfile, Profile } from 'commons/commons';
import { APIResponse } from 'commons/commons/dto/api-response.dto';
import { JwtService } from '@nestjs/jwt';
import { FindCondition, FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcryptjs';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
 

@Injectable()
export class AuthService {



    constructor(
        private readonly jwtService: JwtService, 
        @InjectRepository(Account)
        private accountRepo : Repository<Account>,

        @InjectRepository(Profile)
        private profileRepo : Repository<Profile>,

        @InjectRepository(JobProfile)
        private jobProfileRepo : Repository<JobProfile>,
    
    ) {
    }
    
    public async login(credentials: AuthCredentialsDto): Promise<any>{
  
        try{

          const {ReferenceNbr , Password } = credentials;
  
          // const user = await this.accountRepo.findOne({ where : { ReferenceNbr }, relations : ['profile']})

          // const user =  await this.accountRepo.createQueryBuilder('account')
          // .leftJoinAndSelect('account.profile', 'profile')
          // .leftJoinAndSelect('profile.job_profiles', 'job_profiles')
          // .where('account.ReferenceNbr = :refNbr ' , { refNbr : ReferenceNbr })
          // .getOne()
           

          const user = await this.findOneAccount({ReferenceNbr})
          
          if(user)
          {
  
              // const isMatch = await compareSync(Password, user.Password);

              const isMatch :  boolean = user.Password == Password ? true : false;
  
  
            if(isMatch){
  
                return {
                  result : user,
                  status : 200
                };
            
            }else{
              return {
                  result : false,
                  status : 401,
                  "message": [
                      "Incorrect Password",
                  ],
                  "error": "Unathorized User"
                };
            }
          }else{
            return {
                  result : false,
                  status : 401,
                  "message": [
                      "Username Not Found",
                  ],
                  "error": "Unathorized User"
              };
          }
          

        } catch(error){
          throw error;
        }
      }


    async validateToken(jwt: string) {
        return await this.jwtService.verify(jwt);
    }


    async jwtSignUser(signPayload : any): Promise<any | undefined> {
   
        return await this.jwtService.signAsync(signPayload);
    }



    async findOneAccount(query : FindCondition<Account>) : Promise<Account> {
      // return this.accountRepo.findOne({ where : query })

      const user =  await this.accountRepo.createQueryBuilder('account')
      .leftJoinAndSelect('account.profile', 'profile')
      .leftJoinAndSelect('profile.job_profiles', 'job_profiles')
      .where(query)
      .getOne()


      return user;

    }



    async saveAccount(account : Account) : Promise<Account> {
      return await this.accountRepo.save(account);
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
