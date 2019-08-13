import { Component, OnInit, OnDestroy } from '@angular/core';
import { SignalRService } from 'src/app/shared/services/signal-r.service';
import { AuthenticationService } from 'src/app/shared/services/auth.service';
import { VoteService } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'vote',
    templateUrl: './vote.component.html',
    styleUrls: ['./vote.component.scss']
  })
export class VoteComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
      this.signalRService.disconnect();
    }

    ngOnInit(): void {
      this.signalRService.connect();
      setTimeout(() => this.signalRService.addListeners(),1000);

      this.voteService.status().pipe(
        map(result => {
          if(result.success)
          {
            this.signalRService.state = result.data;
            this.loaded = true;
          }
        })
      ).subscribe();

    }

    loaded = false;

    voteBaseUrl : string = "https://gtop100.com/topsites/Flyff/sitedetails/Euphresia-FlyFF-Comming-soon-95466?vote=1&pingUsername=";
    voteUrl : string = "";

    constructor(public signalRService : SignalRService, private authService : AuthenticationService, private voteService : VoteService)
    {
      this.voteUrl = this.voteBaseUrl + this.authService.userInfo.Id;
    }

    openVoteLink()
    {
      if(this.signalRService.state.state == "CAN_VOTE")
      {
        this.signalRService.state.state = "WAITING_FOR_VOTE"; 
        this.signalRService.state.timeSpan = "";
        window.open(this.voteUrl,"_blank");
      }
    }
}