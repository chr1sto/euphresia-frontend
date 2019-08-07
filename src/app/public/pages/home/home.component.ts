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

  currentPageVisible : number = 0;
  currentPage : number = 0;
  recordsPerPage : number = 4;
  pageCount : number = 0;
  totalRecCount : number = 0;

    ngOnInit(): void {
      this.updateData();
    }

    constructor(private newsService : NewsService)
    {
    }

    updateData()
    {
      this.newsService.newsGet(this.currentPage,4).pipe(
        map(result => {
          if(result.success)
          {
            this.news = result.data.content;
            this.totalRecCount = result.data.recordCount;
            this.pageCount = result.data.pageCount;
            this.currentPageVisible = result.data.currentIndex;
          }
        })
      ).subscribe();
    }

    previous()
      {
        this.currentPage--;
        if(this.currentPage < 0 ) 
        {
          this.currentPage = 0;
        }
        else
        {
          this.updateData();
        }
      }
    
      next()
      {
        this.currentPage++;
        if(this.currentPage > (this.pageCount - 1))
        {
          this.currentPage = this.pageCount - 1;
        }
        else
        {
          this.updateData();
        }
      }
}
