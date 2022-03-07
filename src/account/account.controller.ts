import { Controller } from '@nestjs/common';
import { Crud, CrudController } from "@nestjsx/crud";
import { Account } from 'commons/commons';
import { AccountService } from './account.service';

@Crud({
    model: {
      type: Account,
    },
})
@Controller('account')
export class AccountController implements CrudController<Account> {

    constructor(public service: AccountService) {}

}
