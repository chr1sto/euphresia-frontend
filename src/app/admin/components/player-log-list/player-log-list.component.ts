import { Component, Input, OnInit } from '@angular/core';
import { PlayerLogService, PlayerLog } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
    selector: 'player-log-list',
    templateUrl: './player-log-list.component.html',
    styleUrls: ['./player-log-list.component.scss'],
    animations: [
        trigger('detailExpand', [
          state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
      ],
  })
export class PlayerLogListComponent implements OnInit{
    ngOnInit(): void {
        this.loadData();
    }
    
    data : PlayerLog[] = [];
    index : number = 0;
    count : number = 10;
    totalCount : number = 0;
    expandedElement : PlayerLog = null;

    displayedColumns: string[] = ['timeStamp', 'info'];

    @Input() id : string;

    constructor(private playerLogService : PlayerLogService){

    }

    loadData()
    {
        console.log(this.id);
        this.playerLogService.logPlayerGet(this.id,this.index,this.count).pipe(
            map(result => {
                this.data = result.data.content;
                this.totalCount = result.data.recordCount;
            })
        ).subscribe();
    }

    changePage(event : any)
    {
      this.index = event.pageIndex;
      this.loadData();
    }

    parse(val: string) : any
    {
        var p = JSON.parse(val);    
        return p;
    }
}
