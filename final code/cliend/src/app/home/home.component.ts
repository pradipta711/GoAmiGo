import { Component, OnInit } from '@angular/core';


import { NavbarService } from './../services/navbar.service';
@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
   
    private username = "";

    constructor(public nav: NavbarService) {
       // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.nav.show();
        this.loadAllUsers();
        this.username = sessionStorage.getItem('userName');

    }

    private loadAllUsers() {
       // this.userService.getAll().subscribe(users => { this.users = users; });
    }
}