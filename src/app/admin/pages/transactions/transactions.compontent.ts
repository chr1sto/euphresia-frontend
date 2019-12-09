import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TransactionsService, TransactionAdminViewModel } from 'src/app/shared/services/generated.services';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

@Component({
    selector: 'transactions',
    templateUrl: './transactions.component.html',
    styleUrls: ['./transactions.component.scss']
  })
export class TransactionsComponent {

  constructor()
  {

  }
}