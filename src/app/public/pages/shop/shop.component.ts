import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest, ITransactionItem } from 'ngx-paypal';
import { DonationService } from 'src/app/shared/services/donation.service';
import { AuthenticationService } from 'src/app/shared/services/auth.service';

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

  constructor(public donationService : DonationService, public authService : AuthenticationService)
  {
    
  }

  ngOnInit(): void {
      this.selectProduct(this.products[0])
  }

  public selectProduct(product : Product)
  {
    this.selectedProduct = product;
    this.getItems(product);
    this.initConfig(product);
  }

  private initConfig(product : Product): void {
      var mail = this.authService.userInfo.Id;
      this.payPalConfig = {
          currency: 'EUR',
          clientId: 'AfVGPTPTMsaXHyUdSkdM8n9iViKFauE1E8XEfKPQAznDF04C-U-yGcRwlHgb3w0XRlNMBl9jN8EuaOH7',
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
                  items: this.items,
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
            this.donationService.verifyPaypalOrder(data.id).subscribe(() => {
              if(this.donationService.ppResult != '' && this.donationService.ppResult != '0')
              {
                console.log(this.donationService.ppResult);
                this.showSuccess = true;
                this.authService.updateCurrencies();
              }
              else{
                this.showError = true;
              }
            });
            console.log(data);

          },
          onCancel: (data, actions) => {
              console.log('OnCancel', data, actions);
              this.showCancel = true;

          },
          onError: err => {
              console.log('OnError', err);
              this.showError = true;
          },
          onClick: (data, actions) => {
              console.log('onClick', data, actions);
              this.resetStatus();
          }
      };
      console.log(this.payPalConfig);
    }

    public resetStatus() : void
    {

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
          },
          {
            name: 'Bonus Donate Points',
            unit_amount: {
              value: '0',
              currency_code: 'EUR'
            },
            quantity: product.free,
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
