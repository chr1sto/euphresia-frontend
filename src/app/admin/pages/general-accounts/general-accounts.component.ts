import { Component, OnInit } from '@angular/core';
import { AccountService, ApplicationUser } from 'src/app/shared/services/generated.services';
import { map, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'general-accounts',
    templateUrl: './general-accounts.component.html',
    styleUrls: ['./general-accounts.component.scss']
  })
export class GeneralAccountsComponent implements OnInit{
  accounts : Array<ApplicationUser>
  accountsCurrentPageIndex : number = 0;
  accountsPageCount : number = 0;
  searchText : string = "";
  searchTextChanged = new Subject<string>();
  subscription : Subscription


  displayedColumns: string[] = ['email', 'username', 'mail-confirmed'];

  ngOnInit(): void {
    this.refreshAccountList();

    this.subscription = this.searchTextChanged
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(e => {
          this.refreshAccountList();
          console.log(e);
        })
      ).subscribe();
  }

  constructor(private accountService : AccountService)
  {

  }

  refreshAccountList()
  {
    this.accountService.account(this.accountsCurrentPageIndex,25,this.searchText)
    .pipe(
      map(
       result => {
         this.accounts = result.data.content;
         this.accountsPageCount = result.data.pageCount;
       } 
      )
    ).subscribe();
  }

  open(row : any)
  {

  }

  search(value: string)
  {
    this.searchTextChanged.next(value);
  }

  changePage(event : any)
  {
    this.refreshAccountList();
  }
}