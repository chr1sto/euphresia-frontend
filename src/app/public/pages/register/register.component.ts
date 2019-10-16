import { Component } from '@angular/core';
import { AccountService, RegisterViewModel } from 'src/app/shared/services/generated.services';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
  })
export class RegisterComponent {
    constructor(private accountService : AccountService, private router : Router, private formBuilder : FormBuilder)
    {
      this.form = this.formBuilder.group({
        email: '',
        password: '',
        confirmedPassword: '',
        tos: false
      })
    }

    form = null;

    password : string;
    confirmedPassword : string;
    email: string;
    secretQuestion: string;
    secretAnswer: string;
    tos : boolean = false;

    errorMessages : Array<string>;
    hasErrors : boolean = false;
    success : boolean = false;

    resolved(event : any)
    {
      console.log(event);
    }

    submit(data)
    {
      var model = new RegisterViewModel();
      model.confirmPassword = data.confirmedPassword;
      model.password = data.password;
      model.email = data.email;

      console.log(data.tos);

      if(!data.tos)
      {
        this.hasErrors = true;
        this.errorMessages = ["You have to read and accept our Terms of Service in order to create an Account!"];
        this.success = false;
        return;
      }

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
