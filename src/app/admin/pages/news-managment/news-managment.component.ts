import { Component, OnInit } from '@angular/core';
import { NewsService, NewsPostViewModel } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'news-managment',
    templateUrl: './news-managment.component.html',
    styleUrls: ['./news-managment.component.scss']
  })
export class NewsManagmentComponent implements OnInit {
    publishedNews : Array<NewsPostViewModel>
    publishedNewSelectedPage : number = 0;
    publishedNewsPageCount : number = 0;
    publishedNewsRecordCount : number = 0;

    unpublishedNews : Array<NewsPostViewModel>
    unpublishedNewSelectedPage : number = 0;
    unpublishedNewsPageCount : number = 0;
    unpublishedNewsRecordCount : number = 0;

    displayedColumns: string[] = ['title', 'date', 'tags'];

    ngOnInit(): void {
        this.updatePublished();          
        this.updateUnpublished();
    }

    constructor(private newsService : NewsService, private router : Router){

    }

    updatePublished()
    {
        console.log("xxx")
        this.newsService.newsGet(this.publishedNewSelectedPage,10)
        .pipe(
            map(
                x => {
                    console.log(x)
                    this.publishedNews = x.data.content;
                    this.publishedNewsPageCount = x.data.pageCount;
                    this.publishedNewsRecordCount = x.data.recordCount;
                    console.log(x);
                }
            )
        ).subscribe();
    }

    updateUnpublished()
    {
        this.newsService.unpublished(this.unpublishedNewSelectedPage,10)
        .pipe(
            map(
                x => {
                    this.unpublishedNews = x.data.content;
                    this.unpublishedNewsPageCount = x.data.pageCount;
                    this.unpublishedNewsRecordCount = x.data.recordCount;
                }
            )
        ).subscribe();
    }


    changePage(event : any, published : boolean)
    {
        if(published)
        {
            this.publishedNewSelectedPage = event.pageIndex;
            this.updatePublished();
        }
        else
        {
            this.unpublishedNewSelectedPage = event.pageIndex;
            this.updateUnpublished();
        }
    }

    createNew()
    {
        this.router.navigate(['/admin/news-detail'])
    }

    open(row : any)
    {
        this.router.navigate(['/admin/news-detail/'+row.id])
    }
}