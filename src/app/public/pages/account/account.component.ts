import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/auth.service';
import { VoteService } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
  })
export class AccountComponent implements OnInit {
  ngOnInit(): void {
    this.voteService.balance().pipe(
      map(result => {
        if(result.success)
        {
          this.votePoints = result.data;
        }
      })
    ).subscribe();
  }

    votePoints : number = 0;

    constructor(public authService : AuthenticationService, private voteService : VoteService)
    {

    }
}