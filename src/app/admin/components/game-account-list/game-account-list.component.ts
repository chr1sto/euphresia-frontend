import { Component, Input, OnInit } from '@angular/core';
import { GameAccountService, GameAccountViewModel } from 'src/app/shared/services/generated.services';

@Component({
    selector: 'game-account-list',
    templateUrl: './game-account-list.component.html',
    styleUrls: ['./game-account-list.component.scss']
  })
export class GameAccountListComponent implements OnInit{
    ngOnInit(): void {
    }

    displayedColumns: string[] = ['alias', 'account'];

    @Input() gameAccounts : Array<GameAccountViewModel>

    constructor(){

    }
}