import { Component, OnInit, Input } from '@angular/core';
import { NewsPostViewModel } from 'src/app/shared/services/generated.services';

@Component({
    selector: 'news-item',
    templateUrl: './news-item.component.html',
    styleUrls: ['./news-item.component.scss']
  })
export class NewsItemComponent implements OnInit {
    @Input() newsPost : NewsPostViewModel;

    content : string;

    ngOnInit(): void {
        this.content = (new DOMParser).parseFromString(this.newsPost.content, "text/html").documentElement.textContent.split(" ").slice(0,20).join(" ");
    }

    
}