import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencyValue } from 'src/app/core/model/currency-value.enum';
import { TransactionHistoryType } from 'src/app/core/model/transaction-history-type.enum';
import { AtmhistoryService } from 'src/app/core/services/atmhistory.service';
import { AtmstateService } from 'src/app/core/services/atmstate.service';

@Component({
  selector: 'app-atm-list',
  templateUrl: './atm-list.component.html',
  styleUrls: ['./atm-list.component.scss']
})
export class AtmListComponent implements OnInit {
  public restockForm: FormGroup;
  public restockSuccessFull: boolean = false;
  public withdrawlAmount: number = 0;
  public withdrawForm: FormGroup;
  public withdrawlSuccessFull: Boolean = null;
  transactionHistory:any;

  allAmount:any;
  amount:any=[];
  date = new Date();
  constructor(
     private atmHistoryService: AtmhistoryService,
    public atmStateService: AtmstateService) { }

  ngOnInit(): void {
    this.restockForm = new FormGroup({
      twoThousands: new FormControl(0, Validators.min(0)),
      thousands: new FormControl(0, Validators.min(0)),
      fiveHundred: new FormControl(0, Validators.min(0)),
      hundred: new FormControl(0, Validators.min(0))
    });
    this.withdrawForm = new FormGroup({
      withdrawlAmount: new FormControl(0, Validators.min(0))
    });
    this.allAmount = this.atmStateService.getCurrentStock().subscribe(res =>{
      res.forEach(response =>{
        switch(response.value){
          case 'twothousands':this.twoThousands(response.amount);break;
          case 'thousands':this.thousands(response.amount);break;
          case 'fiveHundred':this.fiveHundred(response.amount);break;
          case 'hundred':this.hundred(response.amount);break;
        }
      })
     });

     this.atmHistoryService.getTransactionHistory().subscribe(res =>{
   this.transactionHistory = res;
     })
  }
  public processWithdrawl(): void {
    this.withdrawlAmount = this.withdrawForm.controls['withdrawlAmount'].value;
    this.withdrawlSuccessFull = this.atmStateService.processWithdrawl(this.withdrawlAmount)
    this.logsHistory();
    this.withdrawForm.controls['withdrawlAmount'].setValue(0);
  }
  private logsHistory(): void {
    this.atmHistoryService.addHistory({
      type: TransactionHistoryType[TransactionHistoryType.withdrawl],
      message: 'Attempt to Withdraw of ' + this.withdrawlAmount + ((this.withdrawlSuccessFull) ? `was a success ${new Date}` : ` failed, Cannot Withdrow ${new Date()}`),
      date: new Date(),
      isSuccess:this.withdrawlSuccessFull?true:false
    });
  }
  twoThousands(value){
    this.amount.push(value * 2000)
  }
  thousands(value){this.amount.push(value * 1000)}
  fiveHundred(value){this.amount.push(value * 500)}
  hundred(value){this.amount.push(value * 100)}

  public restock(): void {
    this.updateInventory();
    this.restockSuccessFull = true;
    this.logHistory();
    this.reset();
  }

  private logHistory(): void {
    this.atmHistoryService.addHistory({
      type: TransactionHistoryType[TransactionHistoryType.restock],
      message: 'Hundreads restocked: ' + this.restockForm.controls['twoThousands'].value + ' ' +
               'Fifties restocked: ' + this.restockForm.controls['thousands'].value + ' ' +
               'Twenties restocked: ' + this.restockForm.controls['fiveHundred'].value +  ' ' +
               'Tens restocked: ' + this.restockForm.controls['hundred'].value,
      date: new Date(),
      isSuccess:this.withdrawlSuccessFull?true:false
    });
  }

  private reset(): void {
    this.restockForm.controls['twoThousands'].setValue(0);
    this.restockForm.controls['thousands'].setValue(0);
    this.restockForm.controls['fiveHundred'].setValue(0);
    this.restockForm.controls['hundred'].setValue(0);
  }

  private updateInventory(): void {
    this.atmStateService.addStock(CurrencyValue.twothousands, this.restockForm.controls['twoThousands'].value);
    this.atmStateService.addStock(CurrencyValue.thousands, this.restockForm.controls['thousands'].value);
    this.atmStateService.addStock(CurrencyValue.fiveHundred, this.restockForm.controls['fiveHundred'].value);
    this.atmStateService.addStock(CurrencyValue.hundred, this.restockForm.controls['hundred'].value);
  }


}
