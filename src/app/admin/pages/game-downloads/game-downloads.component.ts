import { Component, OnInit } from '@angular/core';
import { GenericService, GenericObjectViewModel } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { DownloadDetailComponent } from '../../components/download-detail/download-detail.component';

@Component({
    selector: 'game-downloads',
    templateUrl: './game-downloads.component.html',
    styleUrls: ['./game-downloads.component.scss']
  })
export class GameDownloadsComponent implements OnInit {
    ngOnInit(): void {
        this.updateData();
    }

    data : GenericObjectViewModel[] = [];
    displayedColumns: string[] = ['valueType', 'value'];

    constructor(private genericService : GenericService, public dialog : MatDialog)
    {

    }


    updateData()
    {
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


    create(model : GenericObjectViewModel)
    {
        this.genericService.generalPost(model).subscribe(result => {
            this.updateData();
        },
        error => {
            console.log(error);
        })
    }

    update(model : GenericObjectViewModel)
    {
        this.genericService.generalPatch(model).subscribe(result => {
            console.log(result);
            this.updateData();
        },
        error => {
            console.log(error);
        })
    }

    delete(id : string)
    {
        this.genericService.generalDeleteWithid(id).subscribe(
            result => {
                if(!result.success)
                {
                    console.log(result.errors);
                }
                else
                {
                    this.updateData();
                }
            }
        )
    }

    createNew()
    {
        var model = new GenericObjectViewModel();
        model.id = '00000000-0000-0000-0000-000000000000';
        model.createdOn = new Date();
        model.type = 'game-download';
        this.open(model);
    }

    open(row : any)
    {
      console.log(row);
      const dRef = this.dialog.open(DownloadDetailComponent,{
        width: '900px',
        height: '320px',
        data: row
      });

      dRef.afterClosed().subscribe(o => {
          if(dRef.componentInstance.save)
          {
            var data = dRef.componentInstance.data;
            if(dRef.componentInstance.data.id == '00000000-0000-0000-0000-000000000000')
            {
                this.create(dRef.componentInstance.data);
            }
            else
            {
                this.update(dRef.componentInstance.data);
            }
          }
          if(dRef.componentInstance.deleted)
          {
              var id = dRef.componentInstance.data.id;
              this.delete(id);
          }
      })
    }
}