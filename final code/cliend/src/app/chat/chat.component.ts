import { Component, OnInit } from '@angular/core';
import {PlanService} from './../services/plan.service';
import {ChatService} from './../services/chat.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public conversation:string[];
  message:any;
  chats:any;
  chatId:any;
  constructor(public planService:PlanService,public chatService:ChatService) { }

  
  refresh(): void {
    window.location.reload();
}
  send(){
    const msgg={
      chatId: this.chatId,
      text: this.message,
      date:Date.now() ,
      senderId:sessionStorage.getItem('userName'),
      receiverId:''
    }
    
    this.chatService.saveSentMessage(msgg).subscribe(data=>{
      
    });
    
    console.log(this.message);
    this.refresh();
  }

  keypressHandler(event){
    if (event.keyCode === 13){
      this.send();
  }

  }

  ngOnInit() {
    
    // this.chatService.getChatId(this.planService.getTripID()).subscribe(data =>{
    //   console.log(data.data)
    //   this.chatId=data.data;
    // });

    // this.chatService.getChats(this.chatId).subscribe(data =>{
    //   console.log(data.data)
    //   this.chats=data.data;
    // });
  }

}
