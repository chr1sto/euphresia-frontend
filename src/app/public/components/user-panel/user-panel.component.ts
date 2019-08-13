import { AuthenticationService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/shared/models/user-info';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastService } from '../../services/toast.service';

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
            this.hasAdminAccess =  this.auth.isAdmin();
        }
        console.log(this.loggedIn);
    }

    loggedIn: boolean = false;
    hasAdminAccess: boolean = false;

    user: UserInfo;
    form : FormGroup;

    constructor(private auth: AuthenticationService, private router: Router, private formBuilder : FormBuilder, private toastService: ToastService)
    {
        this.form = this.formBuilder.group({
            email: '',
            password: ''
        })
    }

    login(data)
    {
        if(data.email && data.password)
        {
        this.auth.login(data.email,data.password,true).subscribe(() => {
            if(this.auth.hasErrors)
            {
                this.toastService.errorMessages = this.auth.errorMessages;
                this.toastService.enable();
            }
            else
            {
                this.loggedIn = true;
                this.form.reset();
                this.auth.userInfo;
                this.hasAdminAccess =  this.auth.isAdmin();
            }
        });
        }
    }

    logout()
    {
        this.auth.logout();
        this.loggedIn = false;
        this.hasAdminAccess = false;
        this.user = null;
    }
}