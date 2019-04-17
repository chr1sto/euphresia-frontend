import { Component, OnInit } from '@angular/core';
import { GameEventService } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'developer-events',
    templateUrl: './developer-events.component.html',
    styleUrls: ['./developer-events.component.scss']
  })
export class DeveloperEventsComponent implements OnInit{
    events : any = null;
    displayedColumns: string[] = ['action', 'date', 'data', 'user','handled'];
    
    ngOnInit(): void {
        this.service.gameEventsGet().pipe(
            map(
                x => {
                    this.events = x.data;
                }
            )
        ).subscribe();
    }
    constructor(private service : GameEventService)
    {

    }
}