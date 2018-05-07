import { Component, OnInit } from '@angular/core';
import { UsertripService } from './../services/usertrip.service';
import {Http} from '@angular/http';
import { Router } from '@angular/router';
import {PlanService} from './../services/plan.service'
@Component({
  selector: 'app-mytrips',
  templateUrl: './mytrips.component.html',
  styleUrls: ['./mytrips.component.css'],
  providers: [UsertripService]
})
export class MytripsComponent implements OnInit {
    // public userTripService: UsertripService;
    mytrips: any;
  constructor(public router: Router,public userTripService:UsertripService,http:Http, public planTripService: PlanService) { 
    console.log("here")
    console.log(this.mytrips)
  }

  ngOnInit() {
    
    console.log(sessionStorage.getItem('userName'))
    this.userTripService.getAllTrips(sessionStorage.getItem('userName')).subscribe(data =>{
      console.log(data.data);
      this.mytrips = data.data;
      //console.log(this.mytrips);

    });

  }

  onViewLoneTrip(trip){
    
    this.planTripService.setTripID(trip);
    console.log("trip id in onViewLoneTrip: "+trip)
    this.router.navigate(['/lone']);

  }

  onViewGroupTrip(trip){
    this.planTripService.setTripID(trip);
    this.router.navigate(['/group']);
  }
}
