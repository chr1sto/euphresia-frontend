import { Component, OnInit } from '@angular/core';
import { RankingService, CharacterViewModel } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'ranking-small',
    templateUrl: './ranking-small.component.html',
    styleUrls: ['./ranking-small.component.scss']
  })
export class RankingSmallComponent implements OnInit {
    ngOnInit(): void {
      this.updateRanking();
    }

    ranking : CharacterViewModel[] = [];

    constructor(private rankingService : RankingService)
    {

    }

    updateRanking()
    {
      this.rankingService.ranking(0,5,"gearscore",null).pipe(
        map(
          result => {
            if(result.success)
            {
              this.ranking = result.data.content;
              console.log(this.ranking);
            }
            else
            {
              console.log("Could not retrieve player Ranking!");
            }
          }
        )
      ).subscribe();
    }
}