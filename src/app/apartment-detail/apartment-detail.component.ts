import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { SessionDataService } from "../session-data/session-data.service";
import { Apartment } from "../apartment";
import { User } from "../user";
import { Router } from "@angular/router";


@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {

  @Output()
  apartmentChanged = new EventEmitter();


  @Input() //this passes apartment from Apartment-Listing componenet
  apartment: Apartment;
  currentUser: User;
  error: String;
  private message: string;
  usersThatLiked: User[];
  baseUrl = 'http://localhost:4567/api/apartments';
  
  //hasLiked = false;
  //likeCount = 0;

  constructor(private SDS: SessionDataService, private ADS: ApartmentDataService, private router: Router) {
    this.usersThatLiked = [];
   }

  ngOnInit() {
    
    this.currentUser = this.SDS.getCurrentUser();
      //if this is not null, use method; otherwise likeCount = 0; 
     this.setUserLikes();
     
     
    
  }

   clickActivate() {
     console.log("activate click Ran");
     this.ADS
      .activateApartment(this.apartment)
        .subscribe(
           apartment => this.setApartmentAndFireEvent(apartment),
         e => this.message = 'Oops! We ran into the following error: ' + e
                  );

  }

  clickDeactivate() {
    console.log("deactivate Ran");
    this.ADS
      .deactivateApartment(this.apartment)
        .subscribe(
          apartment => this.setApartmentAndFireEvent(apartment),
         e => this.message = 'Oops! We ran into the following error: ' + e
      );
  }

 
  likeClick(apartment: Apartment) {
    console.log('ads.likeClick() ran');
      this.ADS
            .addLike(this.apartment)
            .subscribe(apartment => this.setApartmentAndFireEvent(apartment))
          
         // this.ADS.getMyListings();
         // this.ADS.getActiveListings();
    // this.setUserLikes();
         // this.setUserLikes();
          //this.determinehasLiked();
          console.log('this ran');
         
  }



  setUserLikes() {
    console.log('ads.setUserLikes() ran');
    this.ADS
            .getUsersThatHaveLiked(this.apartment)
            .subscribe(
             
              //return users that have liked and set to instance variable
                usersThatLiked =>
                 this.usersThatLiked = usersThatLiked,
                () => this.error = 'Could not find likes.'
            );
   
  }

   private setApartmentAndFireEvent(apartment) {
   
    this.apartment = apartment;
    this.apartmentChanged.emit();
    this.setUserLikes();
  }

   private hasLiked(){
          
            for (let user of this.usersThatLiked) {
              if (user.id === this.currentUser.id) 
                 return true;
            }
             return false;
    }
         
   
  
  

}
