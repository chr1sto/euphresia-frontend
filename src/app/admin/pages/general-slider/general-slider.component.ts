import { Component, OnInit } from '@angular/core';
import { GenericService, GenericObjectViewModel } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';
import { CreateImageObjectComponent } from '../../components/create-image-object/create-image-object.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'general-slider',
    templateUrl: './general-slider.component.html',
    styleUrls: ['./general-slider.component.scss']
  })
export class GeneralSliderComponent implements OnInit {
    slider : GenericObjectViewModel[];

    url : string;

    displayedColumns: string[] = ['createdOn', 'url', 'actions'];

    ngOnInit(): void {
        this.updateEntries();
    }

    constructor(private sliderService : GenericService,public dialog : MatDialog)
    {

    }

    updateEntries()
    {
        this.sliderService.generalGet("slider",100).pipe(
            map(result => {
                if(result.success)
                {
                    this.slider = result.data;
                    console.log(this.slider);
                }
            })
        ).subscribe();
    }

    createNew()
    {
        const dRef = this.dialog.open(CreateImageObjectComponent,{
        width: '350px',
        data: 'slider'
        });

        dRef.afterClosed().subscribe(o => {
            this.updateEntries();
        })
    }

    remove(element : any)
    {
        this.sliderService.generalDeleteWithid(element.id).pipe(
            map(
                result => {
                    if(result.success)
                    {
                        this.updateEntries();
                    }
                }
            )
        ).subscribe();
    }
}