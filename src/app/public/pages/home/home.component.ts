import { Component, OnInit } from '@angular/core';
import { NewsService, NewsPostViewModel } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  })
export class HomeComponent implements OnInit {
  news : NewsPostViewModel[] = [];

  ngOnInit(): void {
    this.newsService.newsGet(0,4).pipe(
      map(result => {
        if(result.success)
        {
          this.news = result.data.content;
        }
      })
    ).subscribe();
  }
    constructor(private newsService : NewsService)
    {
    }
}
