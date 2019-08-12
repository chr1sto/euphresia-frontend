import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/auth.service';
import { VoteService, TransactionViewModel } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'transaction-history',
    templateUrl: './transaction-history.component.html',
    styleUrls: ['./transaction-history.component.scss']
  })
export class TransactionHistoryComponent implements OnInit {
  ngOnInit(): void {
    this.updateData();
  }

  data : TransactionViewModel[];
  currentPageVisible : number = 0;
  currentPage : number = 0;
  recordsPerPage : number = 20;
  pageCount : number = 0;
  totalRecCount : number = 0;

    constructor(private voteService : VoteService)
    {

    }


    updateData()
    {
      this.voteService.vote(this.currentPage,this.recordsPerPage).pipe(
        map(
          result => {
            if(result.success)
            {
              this.data = result.data.content;
              this.currentPageVisible = result.data.currentIndex;
              this.totalRecCount = result.data.recordCount;
              this.pageCount = result.data.pageCount;
            }
          }
        )
      ).subscribe();
    }

    previous()
    {
      this.currentPage--;
      if(this.currentPage < 0 ) 
      {
        this.currentPage = 0;
      }
      else
      {
        this.updateData();
      }
    }
  
    next()
    {
      this.currentPage++;
      if(this.currentPage > (this.pageCount - 1))
      {
        this.currentPage = this.pageCount - 1;
      }
      else
      {
        this.updateData();
      }
    }
}