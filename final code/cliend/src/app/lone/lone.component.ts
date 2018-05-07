import { NavbarService } from './../services/navbar.service';
//import { Component, OnInit } from '@angular/core';
import { Component, OnInit,ElementRef, NgZone, ViewChild} from '@angular/core';
import {PlanService} from './../services/plan.service';
import {TransactionService} from './../services/transaction.service';
import { UUID } from 'angular2-uuid';
import { UsertripService} from './../services/usertrip.service'
//suggestions
import { SuggestionsService } from './../services/suggestions.service';
import {restaurantDetails} from './../../../../models/resturantDetails';
import {atmDetails} from './../../../../models/atmDetails';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
//suggestions

@Component({
  selector: 'app-lone',
  templateUrl: './lone.component.html',
  styleUrls: ['./lone.component.css']
})
export class LoneComponent implements OnInit {
  transactions: any;
  description:any;
  amount:0.0;
  total=0.0;
  available=0.0;
 tripId = "";
 public tripInfo:any;
 //suggestions
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
 //public modelid: PlanComponent;

 public restaurantsList: restaurantDetails[];
 public atmList: atmDetails[];

 //suggestions
 




  constructor(private userTripService: UsertripService,private mapsAPILoader: MapsAPILoader,public uuid: UUID,public planservice:PlanService,public transactionService:TransactionService,private ngZone: NgZone,private suggestionservice:SuggestionsService ) { }

  ngOnInit() {
    //this.available=this.planservice.getBudget();
    this.tripId=this.planservice.getTripID();
    this.userTripService.getTripsByTripId(this.tripId).subscribe(data =>{
      console.log(data.data[0])
      this.tripInfo=data.data[0];
      this.total = this.tripInfo.budget;
      this.available = this.total;
    });;
    //this.total = this.tripInfo.budget;
    console.log(this.planservice.getTripID());
    this.transactionService.getAllTransactions(this.tripId).subscribe(data =>{
      console.log(data.data)
      this.transactions=data.data;
      if(this.transactions){
        this.available = this.transactions[0].availableBal;
      }
      
    });
    
  


//suggestions
   //create search FormControl
   this.searchControl = new FormControl();

   //set current position
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

//suggestions

  }
  //suggestions

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

getval1()
{
  
    this.restaurantPlaceApicall(this.latitude , this.longitude);
    document.getElementById("div2").style.visibility="hidden";
   
}
getval2(){
    
    this.atmPlaceApicall(this.latitude , this.longitude);
    document.getElementById("div1").style.visibility="hidden";
    
}
onUpdate(){
  this.available=this.available-this.amount;
 const transaction={
    txId:UUID.UUID(),
    userId: sessionStorage.getItem('userName'),
    tripId: this.planservice.getTripID(),
    txamount:this.amount,
     txdate:Date.now(),
     type:"debit",
     availableBal:this.available ,
     description: this.description
 }     
 console.log("after creation of temp object of tx",transaction)
 this.transactionService.saveTransaction(transaction).subscribe(data =>{


});
this.transactionService.getAllTransactions(this.planservice.getTripID()).subscribe(data =>{
  this.transactions = data.data;
  console.log("in transactions"+data.data)
});
this.description="";
this.amount=0.0;
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
         //console.log(this.res_atm.results,"results fetched")
         this.atmList = new Array(this.res_atm.results.length);
         for ( var i = 0; i < this.res_atm.results.length; i ++ ){
             // this.rstaurantnameList = true;
            //  this.restaurantsList[i].name = this.res.results[i].name;
            //  this.restaurantsList[i].vicinity = this.res.results[i].vicinity;
            var lat=this.res_atm.results[i].geometry.location.lat;
            var lng=this.res_atm.results[i].geometry.location.lng;
            
            this.atmList[i] = new atmDetails(this.res_atm.results[i].name,this.res_atm.results[i].vicinity,lat,lng)
          }
        }
          else{
            this.atmnameList = false;
          }
      // if(this.res.results){
      //  for(var i = 0; i < this.res.results.length; i ++ ){
      //    this.rstaurantnameList = true;
      //   this.rstaurantname = this.res.results[i].name;
      //   this.formatted_address = this.res.results[i].vicinity;

      // }
      //}
      //console.log(this.restaurantsList)
    }
  ),
 error => {console.log(error)},
       () => console.log('Google Place API called.')

}



//suggestions


}
