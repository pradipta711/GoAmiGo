import { Component, OnInit,ElementRef, NgZone, ViewChild} from '@angular/core';
import {PlanService} from './../services/plan.service';
import {TransactionService} from './../services/transaction.service';
import { UUID } from 'angular2-uuid';
import { NavbarService } from './../services/navbar.service';
//suggestions
import { SuggestionsService } from './../services/suggestions.service';
import {restaurantDetails} from './../../../../models/resturantDetails';
import {atmDetails} from './../../../../models/atmDetails';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { UsertripService} from './../services/usertrip.service';
import {FileService} from './../services/file.service';
//suggestions
import {ImageGalleryComponent} from './../image-gallery/image-gallery.component';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  transactions:any;
  imageComp:any;
  description:"";
  amount:0.0;
  total=0.0;
  available=0.0;
  destination:any;
  fromdate:any;
  todate:any;
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
 members:any;
 public restaurantsList: restaurantDetails[];
 public atmList: atmDetails[];
 public trip: any;
public tripId: "";
public radioValue="";
 //suggestions
 
 
 
  constructor(public userTripService : UsertripService,private mapsAPILoader: MapsAPILoader,public uuid: UUID,public planservice:PlanService,public transactionService:TransactionService,private ngZone: NgZone,private suggestionservice:SuggestionsService,private fileSer:FileService) { }
  
  ngOnInit() {
    
   
    // this.available=this.planservice.getBudget();
    
      this.tripId=this.planservice.getTripID();
    console.log("from group component.ts , call from planservice tripId:"+this.tripId);
    this.userTripService.getTripsByTripId(this.tripId).subscribe(data =>{
      console.log("data ")
      console.log(data.data)
      this.trip = data.data;
      this.total=this.trip[0].budget;
      this.available = this.total;
      this.fromdate=this.trip[0].fromdate;
      this.todate=this.trip[0].todate;
      this.destination=this.trip[0].destination;
      this.members=this.trip[0].members
    });
    
    this.transactionService.getAllTransactions(this.tripId).subscribe(data =>{
      console.log("tripId passed in getalltx"+this.tripId)  
      console.log("get all tx from tripId")
      console.log(data);
      this.transactions=data.data;
      if(!this.transactions){
        this.available=this.transactions[0].availableBal;
      }
    });
    //this.total=this.trip.;
    //console.log("total for this.trip.budget"+this.total);



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
  
  calculateAvailableBudget(amt,type){
    if(type=='debit'){
      
      
    }else{

    }
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
       availableBal:this.available - this.amount,
       description: this.description
   }     
   console.log(transaction)
   this.transactionService.saveTransaction(transaction).subscribe(data =>{


  });
  this.transactionService.getAllTransactions(this.tripId).subscribe(data =>{
    this.transactions = data.data;
    console.log("in transactions"+data.data)
  });
  this.description="";
  this.amount=0.0;
  }

  onDelete(transactionId){
    //let transactionId=UUID.UUID()
  //   let transactionOld=this.transactions[transactionId];
  //   const transaction = {
  //     transactionId:transactionId,
  //     userId: sessionStorage.getItem('userName'),
  //     tripId: this.planservice.getTripID(),
  //     txamount:transactionOld.txamount,

  //     amount:this.form.get('amount').value  
  // }
  
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
  getval()
  {
     //var id = document.getElementById.toString();
    
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
