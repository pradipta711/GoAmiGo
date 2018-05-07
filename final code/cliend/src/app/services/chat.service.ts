import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService {
  domain = "http://localhost:8080";
  constructor(private http: Http) { }


  getChats(tripId){
    return this.http.get(this.domain+ '/chat/getchat',tripId).map(res => res.json());
  }

  getChatId(tripId){
    return this.http.get(this.domain+ '/chat/getchatid',tripId).map(res => res.json());
  }

  saveSentMessage(message){
    return this.http.post(this.domain + '/chat/chatdetails',message).map(res => res.json());
  }

  saveTripChat(chat){
    return this.http.post(this.domain + '/chat/groupchatdetails',chat).map(res => res.json());
  }
}
