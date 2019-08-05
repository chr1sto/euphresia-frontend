import { Component, OnInit } from '@angular/core';
import { RankingService, CharacterViewModel } from 'src/app/shared/services/generated.services';
import { RankingHelperService } from 'src/app/shared/services/ranking-helper.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'player-ranking',
    templateUrl: './player-ranking.component.html',
    styleUrls: ['./player-ranking.component.scss']
  })
export class PlayerRankingComponent implements OnInit 
{
    ngOnInit(): void {
        this.updateData();
      }
      loading : boolean = true;
      data : CharacterViewModel[];
      currentPageVisible : number = 0;
      currentPage : number = 0;
      recordsPerPage : number = 15;
      pageCount : number = 0;
      totalRecCount : number = 0;
    
      constructor(private rankingService : RankingService, private helper : RankingHelperService)
      {
    
      }
    
      updateData()
      {
        this.loading = true;
        this.rankingService.ranking(this.currentPage,this.recordsPerPage,"gearscore").pipe(
          map(
            result => {
              if(result.success)
              {
                this.data = result.data.content;
                this.pageCount = result.data.pageCount;
                this.totalRecCount = result.data.recordCount;
                this.currentPageVisible = result.data.currentIndex;
                this.loading = false;
              }
            }
          )
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