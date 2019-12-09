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
export class TransactionsComponent implements OnInit{
  transactions : Array<TransactionAdminViewModel>
  transactionsCurrentPageIndex : number = 0;
  transactionsPageCount : number = 0;
  transactionsRecordCount : number = 0;
  searchText : string = "";
  searchTextChanged = new Subject<string>();
  subscription : Subscription


  displayedColumns: string[] = ['userId', 'date', 'amount','currency','reason','status','info'];

  ngOnInit(): void {
    this.refreshTransactionsList();

    this.subscription = this.searchTextChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(e => {
          this.refreshTransactionsList();
          console.log(e);
        })
      ).subscribe();
  }

  constructor(public transactionsService : TransactionsService, public router : Router)
  {

  }

  refreshTransactionsList()
  {
    this.transactionsService.admin(this.transactionsCurrentPageIndex,25,'','',null,null,-100000,100000,'',this.searchText).pipe(
        map(
            result => {
                this.transactions = result.data.content;
                this.transactionsPageCount = result.data.pageCount;
                this.transactionsRecordCount = result.data.recordCount;
            }
        )
    ).subscribe();
  }

  open(row : any)
  {
    this.router.navigate(['/admin/transactions-detail/'+row.id])
  }

  search(value: string)
  {
    this.searchTextChanged.next(value);
  }

  changePage(event : any)
  {
    this.transactionsCurrentPageIndex = event.pageIndex;
    this.refreshTransactionsList();
  }
}