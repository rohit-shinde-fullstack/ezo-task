import { Injectable } from '@angular/core';
import { Currency } from '../model/currency.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrencyValue } from '../model/currency-value.enum';

@Injectable({
  providedIn: 'root'
})
export class AtmstateService {
  private _currentStock: Currency[] = [];
  private _behaviorSubject: BehaviorSubject<Currency[]> = new BehaviorSubject(null);

  constructor() {
    this._currentStock = [
      { value: CurrencyValue[CurrencyValue.twothousands], display: 2000, amount: 0 },
      { value: CurrencyValue[CurrencyValue.thousands], display: 1000, amount: 0 },
      { value: CurrencyValue[CurrencyValue.fiveHundred], display: 500, amount: 0 },
      { value: CurrencyValue[CurrencyValue.hundred], display: 100, amount:0 },
    ];
    this._behaviorSubject.next(this._currentStock);
  }

  public getCurrentStock(): Observable<Currency[]> { return this._behaviorSubject.asObservable(); }

  public addStock(currencyValue: CurrencyValue, amount: number): boolean {
    this._currentStock[currencyValue].amount += amount;
    this._behaviorSubject.next(this._currentStock);
    return true;
  }

  public processWithdrawl(amount: number) : boolean {

    var twoThoudandsUsed = Math.floor(amount / 2000);
    if(twoThoudandsUsed > this._currentStock[0].amount) {
      twoThoudandsUsed = this._currentStock[0].amount;
    }
    amount -= twoThoudandsUsed * 2000;

    var thousandsUsed = Math.floor(amount / 1000);
    if(thousandsUsed > this._currentStock[1].amount) {
      thousandsUsed = this._currentStock[1].amount;
    }
    amount -= thousandsUsed * 1000;

    var fiveHundred = Math.floor(amount / 500);
    if(fiveHundred > this._currentStock[2].amount) {
      fiveHundred = this._currentStock[2].amount;
    }
    amount -= fiveHundred * 500;

    var hundred = Math.floor(amount / 100);
    if(hundred > this._currentStock[3].amount) {
      hundred = this._currentStock[3].amount;
    }
    amount -= hundred * 100;

    // var fivesUsed = Math.floor(amount / 5);
    // if(fivesUsed > this._currentStock[4].amount) {
    //   fivesUsed = this._currentStock[4].amount;
    // }
    // amount -= fivesUsed * 5;

    if(amount === 0) {
      this._currentStock[0].amount -= twoThoudandsUsed;
      this._currentStock[1].amount -= thousandsUsed;
      this._currentStock[2].amount -= fiveHundred;
      this._currentStock[3].amount -= hundred;
      return true;
    }

    return false;
  }

  multiplyAmount(){

  }
}
