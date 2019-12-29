import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest, ITransactionItem } from 'ngx-paypal';
import { AuthenticationService } from 'src/app/shared/services/auth.service';
import { DonateService } from 'src/app/shared/services/generated.services';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export class Product
{
  public value : string;
  public dp : string;
  public free : string;
}

@Component({
    selector: 'shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
  })
export class ShopComponent implements OnInit{
  public payPalConfig ? : IPayPalConfig;
  public showSuccess : boolean;
  public showError : boolean;
  public showCancel : boolean;
  public items : ITransactionItem[];
  public selectedProduct : Product;

  public products : Array<Product> = [
    {
      value: "10.00",
      dp: "1000",
      free: "0"
    },
    {
      value: "15.00",
      dp: "1500",
      free: "0"
    },
    {
      value: "25.00",
      dp: "2600",
      free: "100"
    },
    {
      value: "50.00",
      dp: "5500",
      free: "500"
    },
    {
      value: "100.00",
      dp: "11500",
      free: "1500"
    },
    {
      value: "200.00",
      dp: "23500",
      free: "3500"
    }
  ]

  constructor(private router : Router, public donationService : DonateService, public authService : AuthenticationService)
  {
    
  }

  ngOnInit(): void {
      this.selectProduct(this.products[0])
  }

  public selectProduct(product : Product)
  {
    this.selectedProduct = product;
    this.initConfig(product);
  }

  private initConfig(product : Product): void {
      var mail = this.authService.userInfo.Id;
      this.payPalConfig = {
          currency: 'EUR',
          clientId: 'AbX3gxzBi8GtxByPp4u1N3P1wMhvafavEowWDQm2Zc0tSIOVuDrWp0Lj53mCpXf1vAcKvVZrY-GfZ-VG',
          createOrderOnClient: (data) => < ICreateOrderRequest > {
              intent: 'CAPTURE',
              purchase_units: [{
                  amount: {
                      currency_code: 'EUR',
                      value: product.value,
                      breakdown: {
                          item_total: {
                              currency_code: 'EUR',
                              value: product.value
                          }
                      },
                  },
                  items: [
                    {
                      name: product.dp + ' Donate Points',
                      unit_amount: {
                        value: product.value,
                        currency_code: 'EUR'
                      },
                      quantity: '1',
                      category: 'DIGITAL_GOODS'
                    }
                  ],
                  reference_id: mail

              }],
              application_context:
              {
                brand_name: "Euphresia-Flyff",
                shipping_preference: "NO_SHIPPING"
              }
          },
          advanced: {
              commit: 'true'
          },
          style: {
              label: 'paypal',
              layout: 'vertical'
          },
          onApprove: (data, actions) => {

          },
          onClientAuthorization: (data) => {
            this.donationService.verifyPpOrder(data.id).pipe(
              map(
                result => {
                  if(result.data != '' && result.data != '0')
                  {
                    this.showSuccess = true;
                    this.authService.updateCurrencies();
                    setTimeout(() =>  this.reloadComponent(),4000);
                  }
                  else
                  {
                    this.showError = true;
                  }
                }
              )
            ).subscribe();
          },
          onCancel: (data, actions) => {
              this.showCancel = true;
              setTimeout(() =>  this.reloadComponent(),4000);
          },
          onError: err => {
              this.showError = true;
              setTimeout(() =>  this.reloadComponent(),4000);
          },
          onClick: (data, actions) => {
              this.resetStatus();
          }
      };
      console.log(this.payPalConfig);
    }

    public resetStatus() : void
    {

    }

    reloadComponent() {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/shop']);
    }

    private getItems(product : Product) : ITransactionItem[]
    {
      var result : ITransactionItem[];
      if(product.free != '0')
      {
        result = [
          {
            name: 'Donate Points',
            unit_amount: {
              value: '0.1',
              currency_code: 'EUR'
            },
            quantity: '' + (parseInt(product.dp) - parseInt(product.free)),
            category: 'DIGITAL_GOODS'
          }
        ];
      }
      else
      {
        result = [
          {
            name: 'Donate Points',
            unit_amount: {
              value: '0.1',
              currency_code: 'EUR'
            },
            quantity: product.dp,
            category: 'DIGITAL_GOODS'
          }
        ];
      }
      console.log(result);

      return result;
    }
}
