import { Component, OnInit } from '@angular/core';
import { NewsService, NewsPostViewModel } from 'src/app/shared/services/generated.services';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
    selector: 'news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss']
  })
export class NewsDetailComponent implements OnInit {
  createNew : boolean = false;
  data : NewsPostViewModel;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      result => {
          if(result.has("id"))
          {
            let id : string = result.get("id");
            this.loadItem(id);
          }
          else
          {
            this.createNew = true;
            this.data = new NewsPostViewModel();
            this.data.public = false;
            this.data.id = "00000000-0000-0000-0000-000000000000";
            this.data.createdOn = new Date();
          }          
      },
      error => console.log(error)
  )
  }

  constructor(private newsService: NewsService, private route: ActivatedRoute, private router: Router)
  {

  }

  loadItem(id : string)
  {
    this.newsService.newsGetByid(id).pipe(
      map(
        result => {
          this.data = result.data;
          this.createNew = false;
        },
        error => {
          console.log(error);
        }
      )
    ).subscribe();
  }

  publish()
  {
    this.data.public = true;
    this.save();
  }

  save()
  {
    if(this.createNew)
    {
      this.newsService.newsPost(this.data).subscribe(result => {
        this.router.navigate(['/admin/news-detail/'+result.data.id])
      },
        _ => console.log(_)
      );
    }
    else
    {
      this.newsService.newsPatch(this.data).subscribe(
        result => {
          this.data = result.data;
        },
        _ => console.log(_)
      );
    }
  }



}