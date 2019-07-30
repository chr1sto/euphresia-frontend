import { Component, OnInit, Inject } from '@angular/core';
import { GameCharacterService, CharacterAdminViewModel, GameAccountService } from 'src/app/shared/services/generated.services';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'game-character-list',
    templateUrl: './game-character-list.component.html',
    styleUrls: ['./game-character-list.component.scss']
  })
export class GameCharacterListComponent implements OnInit{        

    characters : CharacterAdminViewModel[] = [];
    
    searchText : string = "";
    searchTextChanged = new Subject<string>();
    subscription : Subscription

    pageCount : number = 0;
    recordCount : number = 0;
    currentPageIndex : number = 0;

    displayedColumns: string[] = ["name","gearScore","level","perin","penya","euphresiaCoins"];
    
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

    constructor(private gameCharService : GameCharacterService, @Inject(MAT_DIALOG_DATA) public data:string)
    {

    }

    refreshCharList()
    {
        this.gameCharService.gameCharacterGet(this.data,this.currentPageIndex,25,this.searchText).pipe(
            map(
                result => {
                    if(result.success)
                    {
                        this.characters = result.data.content;
                        this.pageCount = result.data.pageCount;
                        this.recordCount = result.data.recordCount;
                        console.log(this.characters);
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