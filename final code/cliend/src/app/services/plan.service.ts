import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';
//import { Trip } from './trip';

@Injectable()
export class PlanService{
tripID:any;
budget=0.0;
constructor(){

}




getBudget(){
    return this.budget;
}

setBudget(budget){
    this.budget=budget;
}

setTripID(tripid){
    this.tripID=tripid
}

getTripID(){
    return this.tripID
}
}
