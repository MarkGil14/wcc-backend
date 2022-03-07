import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'commons/commons';

@Injectable()
export class AccountService extends TypeOrmCrudService<Account>{

    constructor(@InjectRepository(Account) repo) {
        super(repo);
    }

}
