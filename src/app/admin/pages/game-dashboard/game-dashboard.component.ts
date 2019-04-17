import { Component, OnInit } from '@angular/core';
import { ServiceStatusService, ServiceStatusViewModel } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'game-dashboard',
    templateUrl: './game-dashboard.component.html',
    styleUrls: ['./game-dashboard.component.scss']
  })
export class GameDashboardComponent implements OnInit {
    
    serviceStates : ServiceStatusViewModel[] = null;

    ngOnInit(): void {
        console.log("in")
        this.serviceStatusService.recentHidden()
            .pipe(
                map(
                    x => {
                        this.serviceStates = x.data;
                        console.log(x);
                    }
                )
            ).subscribe()
    }

    constructor(private serviceStatusService : ServiceStatusService)
    {
    }
}