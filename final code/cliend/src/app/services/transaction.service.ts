import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class TransactionService {

  domain = "http://localhost:8080";
  transaction;

  constructor(private http: Http) { }


  saveTransaction(transaction){
    console.log("tx"+transaction)
    return this.http.post(this.domain + '/transaction/transactions',transaction).map(res => res.json());
  }
  
  getAllTransactions(tripId){
    console.log("t="+tripId)
    return this.http.get(this.domain+ '/transaction/getTxTripId?tripId='+tripId).map(res => res.json());
  }

  updateTransaction(transaction){
    return this.http.post(this.domain + '/transaction/transactions',transaction).map(res => res.json());
  }

  
}
