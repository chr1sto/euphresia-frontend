import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountManagmentService, ForgotPasswordViewModel, ResetPasswordViewModel } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
  })
export class ForgotPasswordComponent {
    email : string;
    requestMail : string;
    token : string;
    post: boolean = false;

    resetted : boolean = false;

    sent: boolean = false;

    hasErrors : boolean = false;

    errors : string[] = [];

    password: string = "";
    confirmedPassword: string = "";

    constructor(private route: ActivatedRoute, private accountManagmentService : AccountManagmentService, private router: Router)
    {
        this.route.queryParams.subscribe(params => {
            if(params["mail"] && params["token"])
            {
                this.email = params["mail"];
                this.token = params["token"];
                console.log(this.token);
                this.post = true;
                this.sent = false;
            }
        });
    }

    requestReset()
    {
        if(!this.post && this.requestMail)
        {
            var model = new ForgotPasswordViewModel();
            model.email = this.requestMail;
            this.accountManagmentService.forgotPassword(model).pipe(
                map(result =>
                    {
                        if(result.success)
                        {
                            this.sent = true;
                            this.hasErrors = false;
                        }
                        else
                        {
                            this.hasErrors = true;
                            this.errors = result.errors;
                        }
                    }
                )
            ).subscribe();
        }
    }

    resetPassword()
    {
        if(this.password && this.confirmedPassword)
        {
            var model = new ResetPasswordViewModel();
            model.code = this.token;
            model.email = this.email;
            model.password = this.password;
            model.confirmPassword = this.confirmedPassword;
            this.accountManagmentService.resetPassword(model).pipe(
                map(result => {
                    if(result.success)
                    {
                        this.resetted = true;
                        this.hasErrors = false;
                        setTimeout(() =>
                        {
                            this.router.navigate(['web'])
                        }
                        ,1000)
                    }
                    else
                    {
                        this.hasErrors = true;
                        this.errors = result.errors;
                    }
                })
            ).subscribe();
        }
    }
}
