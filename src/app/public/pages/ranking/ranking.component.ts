import { Component, OnInit } from '@angular/core';
import { RankingService, CharacterViewModel } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';
import { RankingHelperService } from 'src/app/shared/services/ranking-helper.service';

@Component({
    selector: 'ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.scss']
  })
export class RankingComponent implements OnInit {
  ngOnInit(): void {
    this.updateData();
  }

  data : CharacterViewModel[];
  currentPage : number = 0;
  recordsPerPage : number = 15;
  pageCount : number = 0;
  totalRecCount : number = 0;

  constructor(private rankingService : RankingService, private helper : RankingHelperService)
  {

  }

  updateData()
  {
    this.rankingService.ranking(this.currentPage,this.recordsPerPage,"gearscore").pipe(
      map(
        result => {
          if(result.success)
          {
            this.data = result.data.content;
            this.pageCount = result.data.pageCount;
            this.totalRecCount = result.data.recordCount;
          }
        }
      )
    ).subscribe();
  }

  previous()
  {
    this.currentPage--;
    this.updateData();
  }

  next()
  {
    this.currentPage++;
    this.updateData();
  }
}
