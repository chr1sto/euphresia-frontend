import { Component, Input, OnInit } from '@angular/core';
import { GameAccountService, GameAccountViewModel } from 'src/app/shared/services/generated.services';
import { MatDialog } from '@angular/material';
import { GameCharacterListComponent } from '../game-character-list/game-character-list.component';

@Component({
    selector: 'game-account-list',
    templateUrl: './game-account-list.component.html',
    styleUrls: ['./game-account-list.component.scss']
  })
export class GameAccountListComponent implements OnInit{
    ngOnInit(): void {
    }

    displayedColumns: string[] = ['alias', 'account','actions'];

    @Input() gameAccounts : Array<GameAccountViewModel>

    constructor(public dialog : MatDialog){

    }

    open(row : any)
    {
      console.log(row);
      const dRef = this.dialog.open(GameCharacterListComponent,{
        width: '900px',
        height: '320px',
        data: row.account
      });

      dRef.afterClosed().subscribe(o => {
       
      })
    }
}