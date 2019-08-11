import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
  })
export class AccountComponent {
    constructor(public authService : AuthenticationService)
    {

    }
}