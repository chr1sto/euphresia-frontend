import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'server-info',
    templateUrl: './server-info.component.html',
    styleUrls: ['./server-info.component.scss']
  })
export class ServerInfoComponent implements OnInit {
    online : boolean = false;
    ngOnInit(): void {

    }
}