import { Component, OnInit } from '@angular/core';
import { ServiceStatusService, ServiceStatusViewModel } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'server-info',
    templateUrl: './server-info.component.html',
    styleUrls: ['./server-info.component.scss']
  })
export class ServerInfoComponent implements OnInit {
    online : boolean = false;
    maintenance : boolean = false;

    time = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin'}));

    serviceStatus : ServiceStatusViewModel;

    ngOnInit(): void {
      setInterval(() => {
        this.time = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin'}));
      },1000)

      this.serverStatusService.serviceStatusGet().pipe(
        map(
          result => {
            if(result.success)
            {
              this.serviceStatus = result.data[0];
              this.online = this.serviceStatus.state == 3;
              this.maintenance = this.serviceStatus.state == 4;
              console.log(this.serviceStatus);
            }
          }
        )
      ).subscribe();
    }

    constructor(private serverStatusService : ServiceStatusService) 
    {

    }
}