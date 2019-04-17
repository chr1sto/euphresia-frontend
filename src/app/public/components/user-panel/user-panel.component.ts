import { AuthenticationService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/shared/models/user-info';

@Component({
    selector: 'user-panel',
    templateUrl: './user-panel.component.html',
    styleUrls: ['./user-panel.component.scss']
  })
export class UserPanelComponent implements OnInit {
    ngOnInit(): void {
        this.loggedIn = this.auth.isLoggedIn;
        if(this.loggedIn)
        {
            this.user = this.auth.userInfo;
            this.hasAdminAccess =  this.auth.isAdmin();
        }
        console.log(this.loggedIn);
    }

    loggedIn: boolean = false;
    error: boolean = false;
    email: string;
    password: string;
    rememberMe: boolean = false;
    hasAdminAccess: boolean = false;

    user: UserInfo;

    constructor(private auth: AuthenticationService, private router: Router)
    {

    }

    login()
    {
        if(this.email && this.password)
        {
        this.auth.login(this.email,this.password,this.rememberMe).subscribe(
            data => {
            this.error = false;
            this.loggedIn = true;
            this.user = this.auth.userInfo;
            this.email = null;
            this.password = null;
            this.hasAdminAccess =  this.auth.isAdmin();
            },
            err => {
            console.log(err);
            this.loggedIn = false;
            this.error = true;
            this.user = null;
            this.hasAdminAccess = false;
            }
        );
        }
    }

    logout()
    {
        this.auth.logout();
        this.loggedIn = false;
        this.hasAdminAccess = false;
        this.user = null;
        this.email = null;
        this.password = null;
    }
}