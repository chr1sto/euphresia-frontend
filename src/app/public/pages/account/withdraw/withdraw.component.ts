import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CharacterViewModel, GameCharacterService, TransactionsService, WithdrawCurrencyViewModel } from 'src/app/shared/services/generated.services';
import { AuthenticationService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'withdraw',
    templateUrl: './withdraw.component.html',
    styleUrls: ['./withdraw.component.scss']
  })
export class WithdrawComponent implements OnInit{
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

    locked : boolean = false;

    characters : CharacterViewModel[] = [];
    selectedChar : string = "";
    amount : number = 0;

    hasErros : boolean = false;
    success : boolean = false;
    errorMessages : string[] = [];
    currency : string = "VP";

    constructor(private characterService : GameCharacterService, private transactionService : TransactionsService, private auth : AuthenticationService)
    {
    }


    submit()
    {
      if(this.selectedChar && this.amount > 0 && !this.locked)
      {
        this.locked = true;
        let viewModel = new WithdrawCurrencyViewModel();
        viewModel.character = this.selectedChar;
        viewModel.amount = this.amount;
        viewModel.currency = this.currency;
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
              this.locked = false;
            }
          )
        ).subscribe();
      }
    }
}
