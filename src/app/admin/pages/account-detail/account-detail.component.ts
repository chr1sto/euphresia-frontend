import { Component, Input, OnInit } from '@angular/core';
import { ServiceStatusViewModel, AccountService, RolesService, ApplicationUser, GameAccountService, GameAccountViewModel } from 'src/app/shared/services/generated.services';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
    selector: 'account-detail',
    templateUrl: 'account-detail.component.html',
    styleUrls: ['./account-detail.component.scss']
  })
export class AccountDetailComponent implements OnInit{

    user : ApplicationUser;
    roles : Array<string>;
    gameAccounts : Array<GameAccountViewModel>;

    ngOnInit(): void {
        this.route.paramMap.subscribe(
            result => {
                if(result.has("id"))
                {
                  let id : string = result.get("id");
                  this.loadItem(id);
                }
                else
                {
                    //TODO CREATE NEW USER
                    console.log("AN ID HAS TO BE PROVIDED!");
                }          
            },
            error => console.log(error)
        );
    }

    constructor(private accountService: AccountService, private rolesService : RolesService, private gameAccountService : GameAccountService,private route: ActivatedRoute, private router: Router){
    }

    loadItem(id: string) : void
    {
        this.accountService.accountGetByid(id).pipe(
            map(
                result => {
                    this.user = result.data;
                }
            )
        ).subscribe();

        this.rolesService.rolesGetByid(id).pipe(
            map(
                result => {
                    this.roles = result.data;
                }
            )
        ).subscribe();

        this.gameAccountService.gameAccountGetByid(id).pipe(
            map(
                result => 
                {
                    this.gameAccounts = result.data;
                }
            )
        ).subscribe();
    }
}
