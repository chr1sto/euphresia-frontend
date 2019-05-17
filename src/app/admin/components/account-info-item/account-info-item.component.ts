import { Component, Input, OnInit } from '@angular/core';
import { ServiceStatusViewModel, AccountService, RolesService, ApplicationUser } from 'src/app/shared/services/generated.services';
import { MatDialog } from '@angular/material';
import { ChangeRolesComponent } from '../change-roles/change-roles.component';
import { map } from 'rxjs/operators';

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

    constructor(private accountService : AccountService, public dialog : MatDialog){

    }

    changeRoles()
    {
      const dRef = this.dialog.open(ChangeRolesComponent,{
        width: '350px',
        data: this.account.id
      });

      dRef.afterClosed().subscribe(o => {
       
      })
    }
}
