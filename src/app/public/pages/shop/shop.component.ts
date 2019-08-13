import { Component, OnInit } from '@angular/core';
import { GameCharacterService, CharacterViewModel, TransactionsService, WithdrawCurrencyViewModel } from 'src/app/shared/services/generated.services';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
  })
export class ShopComponent implements OnInit{
    ngOnInit(): void {
      this.characterService.myCharacters().pipe(
        map(
          result => {
            if(result.success)
            {
              this.characters = result.data;
            }
          }
        )
      ).subscribe();
    }

    characters : CharacterViewModel[] = [];
    selectedChar : string = "";
    amount : number = 0;

    hasErros : boolean = false;
    success : boolean = false;
    errorMessages : string[] = [];

    constructor(private characterService : GameCharacterService, private transactionService : TransactionsService, private auth : AuthenticationService)
    {
    }


    submit()
    {
      if(this.selectedChar && this.amount > 0)
      {
        let viewModel = new WithdrawCurrencyViewModel();
        viewModel.character = this.selectedChar;
        viewModel.amount = this.amount;
        viewModel.currency = "VP";
        this.transactionService.withdraw(viewModel).pipe(
          map(
            result => {
              if(result.success)
              {
                this.hasErros = false;
                this.success = true;
                this.errorMessages = [];
                this.selectedChar = "";
                this.amount = 0;
                this.auth.updateCurrencies();
              }
              else
              {
                this.hasErros = true;
                this.errorMessages = result.errors;
                this.success = false;
                console.log(this.errorMessages);
              }
            }
          )
        ).subscribe();
      }
    }
}
