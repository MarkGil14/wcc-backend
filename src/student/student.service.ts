import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Account } from 'commons/commons';

@Injectable()
export class StudentService  extends TypeOrmCrudService<Account>{


    constructor(@InjectRepository(Account) repo) {
        super(repo);
    }



    async saveAccount(account : Account) : Promise<Account> {
        return await this.repo.save(account);
    }



}
