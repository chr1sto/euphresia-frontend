import { Component, OnInit } from '@angular/core';
import { GameCharacterService, CharacterAdminViewModel, GameAccountService } from 'src/app/shared/services/generated.services';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'game-characters',
    templateUrl: './game-characters.component.html',
    styleUrls: ['./game-characters.component.scss']
  })
export class GameCharactersComponent implements OnInit{
    
    characters : CharacterAdminViewModel[] = [];
    
    searchText : string = "";
    searchTextChanged = new Subject<string>();
    subscription : Subscription

    pageCount : number = 0;
    recordCount : number = 0;
    currentPageIndex : number = 0;

    displayedColumns: string[] = ["name","account","gearScore","level","perin","penya","euphresiaCoins"];
    
    ngOnInit(): void 
    {
        this.refreshCharList();   
            
        this.subscription = this.searchTextChanged
            .pipe(
            debounceTime(500),
            distinctUntilChanged(),
            map(e => {
                this.refreshCharList();
                console.log(e);
            })
            ).subscribe();
    }

    constructor(private gameCharService : GameCharacterService, private gameAccService : GameAccountService)
    {

    }

    refreshCharList()
    {
        this.gameCharService.gameCharacterGet("",this.currentPageIndex,25,this.searchText).pipe(
            map(
                result => {
                    if(result.success)
                    {
                        this.characters = result.data.content;
                        this.pageCount = result.data.pageCount;
                        this.recordCount = result.data.recordCount;
                    }
                    else
                    {
                        console.log(result.errors)
                    }
                }
            )
        ).subscribe();
    }

    search(value: string)
    {
      this.searchTextChanged.next(value);
    }

    changePage(event : any)
    {
      this.currentPageIndex = event.pageIndex;
      this.refreshCharList();
    }

    open(row : any)
    {
        
    }
}