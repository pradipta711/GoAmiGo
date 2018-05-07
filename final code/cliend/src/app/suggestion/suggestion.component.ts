import { Component, OnInit,ElementRef, NgZone, ViewChild  } from '@angular/core';
import { NavbarService } from './../services/navbar.service';
import { NgForm } from '@angular/forms';
//import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps'; 
import { PlanComponent } from './../plan/plan.component';
import {restaurantDetails} from './../../../../models/resturantDetails';
import {atmDetails} from './../../../../models/atmDetails';
import { Router } from '@angular/router';
import { SuggestionsService } from './../services/suggestions.service'
@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public formatted_address:string;
  public noresluts:string;
  public rstaurantname;
  public google:any;
  public atmname;
  public rstaurantnameList:boolean;
  public atmnameList: boolean;
  public title:string;
  @ViewChild("search")
  public searchElementRef: ElementRef;
  public res;
  public res_atm;
  members:any;
  public restaurantsList: restaurantDetails[];
  public atmList: atmDetails[];
  public radioValue = "";
  
  constructor(private mapsAPILoader: MapsAPILoader,public router: Router,
    private ngZone: NgZone,private suggestionservice:SuggestionsService,
    public nav: NavbarService) { 
         this.zoom = 15;
   
    } 

     
ngOnInit() {
  this.searchControl = new FormControl();
  this.setCurrentPosition();
   this.restaurantPlaceApicall(this.latitude,this.longitude);
//load Places Autocomplete
this.mapsAPILoader.load().then(() => {
  let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
    types: ["address"]
  });
  autocomplete.addListener("place_changed", () => {
    this.ngZone.run(() => {
      //get the place result
      let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      
     //verify result
      if (place.geometry === undefined || place.geometry === null) {
        return;
      }

      //set latitude, longitude and zoom
      this.latitude = place.geometry.location.lat();
      this.longitude = place.geometry.location.lng();
      this.formatted_address = place.formatted_address;
       //this.restaurantPlaceApicall(this.latitude,this.longitude); 
    });
  });
});

//this.getTransactions();  

}

private setCurrentPosition() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
  }
}

getval()
{
var id = document.getElementById.toString();

console.log("radioVAlue is "+this.radioValue);
if(this.radioValue == "Resturants" ){
  this.restaurantPlaceApicall(this.latitude , this.longitude);
}
if(this.radioValue == "ATM"){
  this.atmPlaceApicall(this.latitude , this.longitude);
}
}

public restaurantPlaceApicall(lat,lan){
  //console.log(lat,lan)
  this.suggestionservice.restaurantPlaceApi(lat,lan).subscribe(
    data => {
      this.res = data;
     // console.log(this.res.results,"Result");
      
      if(this.res.results.length>0){
         this.rstaurantnameList = true;
        // console.log(this.res.results.geometry.location.lat,"results fetched")
         this.restaurantsList = new Array(this.res.results.length);
         for(var i = 0; i < this.res.results.length; i ++ ){
             // this.rstaurantnameList = true;
            //  this.restaurantsList[i].name = this.res.results[i].name;
            //  this.restaurantsList[i].vicinity = this.res.results[i].vicinity;
           var lat=this.res.results[i].geometry.location.lat;
           var lng=this.res.results[i].geometry.location.lng;
          
            this.restaurantsList[i] = new restaurantDetails(this.res.results[i].name,this.res.results[i].vicinity,this.res.results[i].rating,lat,lng,this.res.results[i].icon)
          
          }
        }
        
          else{
            this.rstaurantnameList = false;
          }
    }
  ),
 error => {console.log(error)},
       () => console.log('Google Place API called.')

}
public atmPlaceApicall(lat,lan){
  //console.log(lat,lan)
  this.suggestionservice.atmPlaceApi(lat,lan).subscribe(
    data => {
      this.res_atm = data;
      //console.log(this.res.results.length,"Result");
      
      if(this.res_atm.results.length > 0)
      {
         this.atmnameList = true;
         this.atmList = new Array(this.res_atm.results.length);
         for ( var i = 0; i < this.res_atm.results.length; i ++ ){
            
            var lat=this.res_atm.results[i].geometry.location.lat;
            var lng=this.res_atm.results[i].geometry.location.lng;
          
           this.atmList[i] = new atmDetails(this.res_atm.results[i].name, this.res_atm.results[i].vicinity,lat,lng)
          }
        }
          else{
            this.atmnameList = false;
          }
          }
  ),
 error => {console.log(error)},
       () => console.log('Google Place API called.')

}







}
