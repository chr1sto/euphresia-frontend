import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionAdminViewModel, TransactionsService, DonateService } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';

@Component({
    selector: 'transaction-detail',
    templateUrl: './transaction-detail.component.html',
    styleUrls: ['./transaction-detail.component.scss']
  })
export class TransactionDetailComponent implements OnInit{
    id : any;
    transaction : TransactionAdminViewModel = null;
    ppOrder : any = null;


    ngOnInit(): void {
        this.route.paramMap.subscribe(
            result => {
                if(result.has("id"))
                {
                  let id : string = result.get("id");
                  console.log(id);
                  this.loadItem(id);
                }
                else
                {
                    //TODO CREATE NEW USER
                    console.log("AN ID HAS TO BE PROVIDED!");
                }          
            },
            error => console.log(error)
        );
    }

    constructor(public transactionsService : TransactionsService, public donationService : DonateService,private route: ActivatedRoute, private router: Router)
    {
        
    }

    loadItem(id)
    {
        this.transactionsService.admin1(id).pipe(
            map(result => {
                this.transaction = result.data;
                this.loadOrderDetails();
            })
        ).subscribe();
    }

    loadOrderDetails()
    {
        if(this.transaction.reason.toUpperCase().includes('DONATION'))
        {
            var orderId = this.transaction.reason.replace('Donation ','');
            setTimeout(() => {
                this.donationService.orderInfo(orderId).pipe(
                    map(result2 => {
                        this.ppOrder = JSON.parse(result2.data.response);
                    },
                    error => console.log(error))
                ).subscribe();
            },500)

        }
        else{
            this.ppOrder = null;
        }
    }
}