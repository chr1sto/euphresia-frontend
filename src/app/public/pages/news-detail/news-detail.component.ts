import { Component, OnInit, ViewEncapsulation, Pipe, PipeTransform } from '@angular/core';
import { NewsService, NewsPostViewModel } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { PageCaptionService } from '../../services/page-caption.service';

@Component({
    selector: 'news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss']
  })
export class NewsDetailComponent implements OnInit {
    newsPost : NewsPostViewModel = new NewsPostViewModel();

    ngOnInit(): void {

    }

    constructor(private newsService : NewsService, private route: ActivatedRoute, private pageCaption : PageCaptionService)
    {
        this.route.paramMap.subscribe(
            result => {
                if(result.has("id"))
                {
                  let id : string = result.get("id");
                  this.loadItem(id);
                }        
            },
            error => console.log(error)
        );
    }

    loadItem(id : string)
    {
        this.newsService.newsGetByid(id).pipe(
            map(
                result => {
                    if(result.success)
                    {
                        this.pageCaption.caption = result.data.caption;
                        this.newsPost = result.data;
                        console.log(this.newsPost);
                    }
                }
            )
        ).subscribe();
    }
}