import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AccountService, API_BASE_URL } from './generated.services';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable()
export class DonationService
{
    public ppResult = '';
    public balance : number = 0;

    constructor(private _http: HttpClient, private _accountService: AccountService, private _router: Router, @Optional() @Inject(API_BASE_URL) private baseUrl?: string) {

    }

    verifyPaypalOrder(orderId : string)
    {
        return this._http.get(this.baseUrl + '/v1/donate/verify-pp-order?orderId='+orderId).pipe(
            map((result : any) => {
                console.log(result);
                this.ppResult = result.data;
            })
        )
    }

    getBalance()
    {
        return this._http.get(this.baseUrl  + '/v1/donate/balance').pipe(
            map((result : any) => {
                this.balance = result.data;
            })
        )
    }
}