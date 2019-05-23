import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'news-box',
    templateUrl: './news-box.component.html',
    styleUrls: ['./news-box.component.scss']
  })
export class NewsBoxComponent implements OnInit {
    online : boolean = false;

    ngOnInit(): void {

    }
}