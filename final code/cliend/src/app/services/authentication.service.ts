import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class AuthenticationService {

  domain = "http://localhost:8080"; 
  user;

  constructor(
    private http: Http
  ) { }


  // Function to register user accounts
  registerUser(user) {
    return this.http.post(this.domain + '/authentication/register', user).map(res => res.json());
  }

  login(user) {
    return this.http.post(this.domain + '/authentication/login', user).map(res => res.json());
  }

  checkUser(userId){
    return this.http.get(this.domain+ '/authentication/usercheck',userId).map(res => res.json());
}
}