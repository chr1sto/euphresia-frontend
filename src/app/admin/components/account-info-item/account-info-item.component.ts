import { Component, Input, OnInit } from '@angular/core';
import { ServiceStatusViewModel, AccountService, RolesService, ApplicationUser } from 'src/app/shared/services/generated.services';

@Component({
    selector: 'account-info-item',
    templateUrl: './account-info-item.component.html',
    styleUrls: ['./account-info-item.component.scss']
  })
export class AccountInfoItemComponent implements OnInit{
    ngOnInit(): void {
    }
    @Input() account : ApplicationUser;
    @Input() roles : Array<string>;

    constructor(private accountService : AccountService){

    }
}
