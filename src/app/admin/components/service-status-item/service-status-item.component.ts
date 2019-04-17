import { Component, Input } from '@angular/core';
import { ServiceStatusViewModel } from 'src/app/shared/services/generated.services';

@Component({
    selector: 'service-status-item',
    templateUrl: './service-status-item.component.html',
    styleUrls: ['./service-status-item.component.scss']
  })
export class ServiceStatusItemComponent {
    @Input() serviceStatus : ServiceStatusViewModel 

    constructor(){
    }

    getStateClass() : string
    {
        var time = new Date().getTime() - this.serviceStatus.timeStamp.getTime();
        if(time > 240000) this.serviceStatus.state=0;
        switch(this.serviceStatus.state)
        {
            case 0: return 'is-offline';
            case 3: return 'is-online';
            case 4: return 'is-maintenance';
            default: return 'is-offline';
        }
    }
}