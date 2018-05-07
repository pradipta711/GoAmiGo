import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UsertripService {

  domain = "http://localhost:8080";
  usertrip;
  usertripDetails;

  public constructor(private http: Http) { }

  saveTripDetails(usertrip){
    //this.saveTrip(usertrip);
    return this.http.post(this.domain + '/trips/tripdetails',usertrip).map(res => res.json());
  }

  //  saveTrip(usertripDetails){
  //   console.log("in usertrip service, save trip method",this.domain,usertripDetails)
  //   return this.http.post(this.domain + '/mytrip/usertrip',usertripDetails).map(res => res.json());
  // }
  getAllTrips(userid){
    return this.http.get(this.domain+ '/mytrip/tripdetailsByName?username='+userid).map(res => res.json());
  }

  getTripsByDestination(destination){
    console.log("in usertrip destination",destination)
    console.log()
    return this.http.get(this.domain+ '/trips/destination?name='+destination).map(res => res.json());
  }

  getTripsByTripId(tripId){
    return this.http.get(this.domain+ '/mytrip/tripdetails?tripId='+tripId).map(res => res.json());
  }
}
