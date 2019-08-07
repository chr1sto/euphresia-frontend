import { Component, OnInit } from '@angular/core';
import { GenericService, GenericObjectViewModel } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'download',
    templateUrl: './download.component.html',
    styleUrls: ['./download.component.scss']
  })
export class DownloadComponent implements OnInit{
  ngOnInit(): void {
    this.genericService.generalGet('game-download',10).pipe(
      map(
        result => {
          if(result.success)
          {
            this.data = result.data;
          }
        }
      )
    ).subscribe();  
  }

  data : GenericObjectViewModel[];

    constructor(private genericService : GenericService)
    {

    }
}