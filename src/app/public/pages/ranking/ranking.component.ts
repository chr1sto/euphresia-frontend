import { Component, OnInit } from '@angular/core';
import { RankingService, CharacterViewModel } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';
import { RankingHelperService } from 'src/app/shared/services/ranking-helper.service';
import { Router } from '@angular/router';

@Component({
    selector: 'ranking',
    templateUrl: './ranking.component.html',
    styleUrls: ['./ranking.component.scss']
  })
export class RankingComponent implements OnInit{
  ngOnInit(): void {
    this.leave(1);
  }

  constructor(private router: Router)
  {
    if(this.router.url.includes('player')) this.activePageIndex = 0;
    if(this.router.url.includes('guild')) this.activePageIndex = 1;
    if(this.router.url.includes('dungeon')) this.activePageIndex = 2;
  }

  activePageIndex : number = 0;

  enter(i)
  {
    if(i == 1)
    {
      document.getElementById('ranking-2').classList.remove('active');
      document.getElementById('ranking-3').classList.remove('active');
      document.getElementById('ranking-1').classList.add('active');
      return;
    }

    if(i == 2)
    {
      document.getElementById('ranking-1').classList.remove('active');
      document.getElementById('ranking-3').classList.remove('active');
      document.getElementById('ranking-2').classList.add('active');
      return;
    }

    if(i == 3)
    {
      document.getElementById('ranking-1').classList.remove('active');
      document.getElementById('ranking-2').classList.remove('active');
      document.getElementById('ranking-3').classList.add('active');
      return;
    }
  }

  leave(i)
  {
    document.getElementById('ranking-'+i).classList.remove('active');
    document.getElementById('ranking-'+(this.activePageIndex+1)).classList.add('active');
  }

  click(i)
  {
    this.activePageIndex = i - 1;
    if(i == 1) this.router.navigate(['ranking/player']);
    if(i == 2) this.router.navigate(['ranking/guild']);
    if(i == 3) this.router.navigate(['ranking/dungeon']);
  }
}
