import { Component, OnInit } from '@angular/core';
import { RankingService } from 'src/app/shared/services/generated.services';

@Component({
    selector: 'ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.scss']
  })
export class RankingComponent {
    constructor(private rankingService : RankingService)
    {
    }
}
