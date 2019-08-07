import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
  })
export class FooterComponent {
    constructor(private viewPortScroller: ViewportScroller)
    {

    }

    scrollToTop() 
    { 
      window.setTimeout(() => {
        document.getElementById("page-head").scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      },100)
    }
}