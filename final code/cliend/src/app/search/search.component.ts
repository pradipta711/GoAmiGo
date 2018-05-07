import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {UsertripService} from './../services/usertrip.service';
import { Http } from '@angular/http';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  trips: any;
  dest = "";
  constructor(
    private router: Router,
    public userTripService:UsertripService,
    private activatedRoute: ActivatedRoute,
    http: Http) { 
      
    }

  ngOnInit() {
  }

  onSubmit(){
    this.userTripService.getTripsByDestination(this.dest).subscribe(data =>{
      console.log(data);
      this.trips = data.data;
      console.log("value of my trips",this.trips);

    });
  }

}