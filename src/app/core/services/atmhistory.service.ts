import { Injectable } from '@angular/core';
import { TransactionHistory } from '../model/transaction-history';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AtmhistoryService {

  private _transactionHistory: TransactionHistory[] = [];
  private _behaviorSubject: BehaviorSubject<TransactionHistory[]> = new BehaviorSubject(null);

  constructor() { }

  public getTransactionHistory(): Observable<TransactionHistory[]> { return this._behaviorSubject.asObservable(); }

  public addHistory(transactionHistory: TransactionHistory): boolean {
    this._transactionHistory.push(transactionHistory);
    this._behaviorSubject.next(this._transactionHistory);
    return true;
  }
}
