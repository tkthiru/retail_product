import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { categories } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  apiServer = 'https://uiexercise.onemindindia.com/api';
  httpOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }
  private _items: any;
  constructor(private httpClient: HttpClient) { }

  create(product): Observable<categories> {
    const categoryType = '/' + product.categoryType + '/';
    return this.httpClient.post<categories>(this.apiServer + '/Product', JSON.stringify(product), this.httpOptions);
  }

  getAll(): Observable<categories> {
    return this.httpClient.get<categories>(this.apiServer + '/Product');
  }
  PlaceOrder(product): Observable<categories> {
    return this.httpClient.post<categories>(this.apiServer + '/OrderProducts',product, this.httpOptions);
  }
}
