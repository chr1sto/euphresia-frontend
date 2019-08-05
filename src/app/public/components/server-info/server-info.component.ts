import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'server-info',
    templateUrl: './server-info.component.html',
    styleUrls: ['./server-info.component.scss']
  })
export class ServerInfoComponent implements OnInit {
    online : boolean = false;

    time = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin'}));

    ngOnInit(): void {
      setInterval(() => {
        this.time = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin'}));
      },1000)
    }
}