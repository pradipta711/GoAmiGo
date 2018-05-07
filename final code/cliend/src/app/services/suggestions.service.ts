import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import { NgForm } from '@angular/forms';
import { BrowserXhr } from "@angular/http";


@Injectable()
export class SuggestionsService extends BrowserXhr {

  constructor(private http: Http) {
	  super();
   }

restaurantPlaceApi(lat,lan){

let headers = new Headers();

headers.append('Content-Type', 'application/x-www-form-urlencoded');
return this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lan+'&radius=1000&type=restaurant&key=AIzaSyDgQfG6Y-bbidUjlgoNX8SotR2ofd2H9kA')
.map(res => res.json())
.catch(this.handleError);
}
atmPlaceApi(lat,lan){

let headers = new Headers();
headers.append('Content-Type', 'application/x-www-form-urlencoded');
return this.http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lan+'&radius=1000&type=atm&key=AIzaSyDgQfG6Y-bbidUjlgoNX8SotR2ofd2H9kA')
			.map(res1 => res1.json())
			.catch(this.handleError);
}

public handleError(error: Response) {
console.error(error);
return Observable.throw(error.json().error || 'Server error');
}

}