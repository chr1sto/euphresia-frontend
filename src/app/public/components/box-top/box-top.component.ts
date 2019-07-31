import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericService } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'box-top',
    templateUrl: './box-top.component.html',
    styleUrls: ['./box-top.component.scss']
  })
export class TopBoxComponent implements OnInit {
    @ViewChild('slideshow') slideshow: any;
    sliderUrls : string[] = [];
    sliderIndex : number = 0;

    ngOnInit(): void {
      this.loadSliders();
    }

    constructor(private sliderService: GenericService)
    {

    }

    loadSliders()
    {
      this.sliderService.generalGet("slider",5).pipe(
        map(
          result => {
            if(result.success)
            {
              let urls = [];
              for(let i = 0; i < result.data.length; i++)
              {
                urls.push(result.data[i].value);
              }
              this.sliderUrls = urls;
            }
            else
            {
              console.log("Could not load sliders!");
            }
          }
        )
      ).subscribe();
    }

    indexChanged(event)
    {
      this.sliderIndex = event;
      console.log(event);
    }

    changeIndex(i)
    {
      this.slideshow.goToSlide(this.sliderUrls.length - i - 1)
    }
}