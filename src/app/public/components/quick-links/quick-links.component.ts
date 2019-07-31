import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'quick-links',
    templateUrl: './quick-links.component.html',
    styleUrls: ['./quick-links.component.scss']
  })
export class QuickLinksComponent implements OnInit {
    ngOnInit(): void {

    }

    constructor(private router : Router){}

    route(r : string)
    {
      this.router.navigate([r]);
    }
}