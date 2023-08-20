import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(
    private http:HttpClient
  ) { }

  getShoppingList():Observable<any>{
    return this.http.get('https://db.ezobooks.in/kappa/image/task').pipe(map(res =>res))
  }
}
