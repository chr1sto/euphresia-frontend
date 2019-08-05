import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountManagmentService } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'verify-mail',
    templateUrl: './verify-mail.component.html',
    styleUrls: ['./verify-mail.component.scss']
  })
export class VerifyMailComponent implements OnInit{
    ngOnInit(): void {
        this.accountManagmentService.verifyMail(this.code,this.id).pipe(
            map(result => {
                if(result.success)
                {
                    this.success = true;
                    setTimeout(() =>
                    {
                        this.router.navigate([''])
                    }
                    ,1000)
                }
                else
                {
                    this.hasErrors = true;
                    this.errorMessage = result.errors.join("\n");

                    setTimeout(() =>
                    {
                        this.router.navigate([''])
                    }
                    ,3000)
                }
            }
        )
        ).subscribe();
    }

    id : string;
    code : string;
    errorMessage : string;
    hasErrors : boolean = true;
    success : boolean = false;


    constructor(private route: ActivatedRoute, private accountManagmentService : AccountManagmentService, private router: Router)
    {
        this.route.queryParams.subscribe(params => {
            if(params["id"] && params["code"])
            {
                this.id = params["id"];
                this.code = params["code"];                
            }
        });
    }
}
