import { Component, OnInit } from '@angular/core';
import { StatisticsService, StatisticsEntryViewModel } from 'src/app/shared/services/generated.services';
import { map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'player-count-chart',
    templateUrl: './player-count-chart.component.html',
    styleUrls: ['./player-count-chart.component.scss']
  })
export class PlayerCountChartComponent implements OnInit {
  ngOnInit(): void {
    this.getData();
  }

  from = new Date(new Date().getTime() - (1000 * 60 * 60 * 24));
  until = new Date(new Date().getTime() + 1);
  count = 24;
  interval : string = 'h';
  intervals : Array<any> = [{
    value: 'h',
    displayValue: 'Hourly'
  },
  {
    value: 'd',
    displayValue: 'Daily'
  },
  {
    value: 'M',
    displayValue: 'Monthly'
  },
  {
    value: 'm',
    displayValue: 'Minutely'
  }
]

  getData()
  {
    var from = this.from.toISOString();
    var until = this.until.toISOString();
    this.statisticsService.statisticsGet(from,until,"PLAYER_COUNT","1",this.count,this.interval).pipe(
      mergeMap((ch1) => this.statisticsService.statisticsGet(from,until,"PLAYER_COUNT","2",this.count,this.interval).pipe(
        map(ch2 => {
          var seriesCh1 = [];
          var seriesCh2 = [];
          for(let i of ch1.data)
          {
            seriesCh1.push({
              "name":  this.getLabel(i.start),
              "value": parseInt(i.value)
            })
          }
          seriesCh1.reverse();
          for(let i of ch2.data)
          {
            seriesCh2.push({
              "name":  this.getLabel(i.start),
              "value": parseInt(i.value)
            })
          }
          seriesCh2.reverse();
          this.multi = [
            {
              "name": "Channel 1",
              "series": seriesCh1
            },
            {
              "name": "Channel 2",
              "series": seriesCh2
            }
          ]
          console.log(this.multi);
        })
      ))
    ).subscribe();
  }

  getLabel(d : Date)
  {
    var weekdays = new Array(7);
    weekdays[0] = "Su";
    weekdays[1] = "Mo";
    weekdays[2] = "Tu";
    weekdays[3] = "We";
    weekdays[4] = "Th";
    weekdays[5] = "Fr";
    weekdays[6] = "Sa";
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    switch(this.interval)
    {
      case "M":
        return monthNames[d.getMonth()];
      case "m":
        return "" + d.getHours() + ":" + d.getMinutes();
      case "d":
        return "" + d.getDate() + "." + (d.getMonth() + 1);
      case "h":
      default:
        return weekdays[d.getDay()] + ", " + d.getHours() + "h";
    }
  }

  multi: any[] = null;
  view: any[] = [700, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Online Players';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#784BA0', '#2B86C5']
  };

  constructor(public statisticsService : StatisticsService) {

  }

  onSelect(data): void {

  }

  onActivate(data): void {

  }

  onDeactivate(data): void {

  }

  
}