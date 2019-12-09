import { Component, OnInit, Input } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TransactionsService, TransactionAdminViewModel } from 'src/app/shared/services/generated.services';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

@Component({
    selector: 'transaction-info-list',
    templateUrl: './transaction-info-list.component.html',
    styleUrls: ['./transaction-info-list.component.scss']
  })
export class TransactionInfoListComponent implements OnInit{
  @Input() userId : string = null;

  transactions : Array<TransactionAdminViewModel>
  transactionsCurrentPageIndex : number = 0;
  transactionsPageCount : number = 0;
  transactionsRecordCount : number = 0;
  searchText : string = "";
  searchTextChanged = new Subject<string>();
  subscription : Subscription;

  currency : string = '';
  currencies : Array<any> = [{
    value: '',
    displayValue: 'All'
  },
  {
    value: 'DP',
    displayValue: 'Donate Points'
  },
  {
    value: 'VP',
    displayValue: 'Vote Points'
  },
]

status : string = '';
statuses : Array<any> = [{
  value: '',
  displayValue: 'All'
},
{
  value: 'FINISHED',
  displayValue: 'Finished'
},
{
  value: 'PENDING',
  displayValue: 'Pending'
},
{
  value: 'FAILED',
  displayValue: 'Failed'
},
]

filterDate : boolean = false;
from : Date = null;
until : Date = null;

minAmount : number = -100000;
maxAmount : number = 1000000;


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
    console.log(this.filterDate)
    console.log(this.from)
    console.log(this.until)
    console.log(this.userId)
    this.transactionsService.admin(this.transactionsCurrentPageIndex,25,this.userId,this.currency,this.filterDate == true ? this.from : null,this.filterDate == true ? this.until : null,this.minAmount,this.maxAmount,this.status,this.searchText).pipe(
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
    this.router.navigate(['/admin/transaction-detail/'+row.id])
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