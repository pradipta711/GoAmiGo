import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  messageClass;
  message;
  processing = false;
  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) { 
                this.createForm();
              }


  createForm(){
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  onLoginSubmit(){
    this.processing = true;
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    }

    this.authService.login(user).subscribe(data =>{
      if(data.success==false){
        //console.log(data)
        this.messageClass='alert alert-danger';
        this.message=data.message;
      }else{
        if(typeof (Storage) !== 'undefined'){

        }
        //console.log("i am here");
        this.messageClass='alert alert-success';
        this.message=data.message;
        if(typeof (Storage) !== 'undefined' ){
          sessionStorage.setItem('userName',this.form.get('username').value)
      }
        this.router.navigate(['/home']);
        
      }
    });
  }
  ngOnInit() {
  }

}
