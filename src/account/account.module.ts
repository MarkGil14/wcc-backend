import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, JobProfile, Profile } from 'commons/commons';

@Module({
  imports : [
    TypeOrmModule.forFeature([
      Account,
      Profile,
      JobProfile,
    ]),  
  ],
  providers: [AccountService],
  controllers: [AccountController]
})
export class AccountModule {}
