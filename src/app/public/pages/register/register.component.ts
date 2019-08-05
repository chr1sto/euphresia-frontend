import { Component } from '@angular/core';
import { AccountService, RegisterViewModel } from 'src/app/shared/services/generated.services';
import { Router } from '@angular/router';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
  })
export class RegisterComponent {
    constructor(private accountService : AccountService, private router : Router)
    {

    }

    password : string;
    confirmedPassword : string;
    email: string;
    secretQuestion: string;
    secretAnswer: string;

    errorMessages : Array<string>;
    hasErrors : boolean = false;
    success : boolean = false;

    resolved(event : any)
    {
      console.log(event);
    }

    submit()
    {
      var model = new RegisterViewModel();
      model.confirmPassword = this.confirmedPassword;
      model.password = this.password;
      model.email = this.email;

      this.accountService.register(model).subscribe(
        result => 
          {
            if(!result.errors)
            {
              this.hasErrors = false;
              this.errorMessages = null;
              this.success = true;
              setTimeout(() =>
              {
                this.router.navigate([''])
              }
              ,3000)
            }
            else
            {
              this.hasErrors = true;
              this.errorMessages = result.errors;
              this.success = false;
            }
          }
      );

    }
}
