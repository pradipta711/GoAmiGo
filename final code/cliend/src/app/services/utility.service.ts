import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilityService {

domain = "http://localhost:8080";
public constructor(private http: Http){}

  isLoggedIn(){
      if(typeof (Storage) !== 'undefined' ){
          if(sessionStorage.getItem('user')){
              return true;
          }
      }
      return false;
  }
  isUserExist(userName){
    return this.http.get(this.domain + '/authentication/usercheck?username='+userName).map(res => res.json());
  }

  
}
