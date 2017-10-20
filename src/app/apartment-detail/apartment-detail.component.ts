import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { SessionDataService } from "../session-data/session-data.service";
import { Apartment } from "../apartment";
import { User } from "../user";
import { Router, Route, ActivatedRoute, ParamMap } from "@angular/router";


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

  constructor(private SDS: SessionDataService, private ADS: ApartmentDataService, private router: Router, private route: ActivatedRoute) {
    this.usersThatLiked = [];
   }

  ngOnInit() {

    this.currentUser = this.SDS.getCurrentUser();
    this.setUserLikes();
    // this.route.paramMap
    //   .subscribe(
    //     (params: ParamMap) => this.ADS
    //       .getApartmentById(Number.parseInt(params.get('id')))
          
    //       .subscribe(apartment => {
    //         this.apartment = apartment;
    //         this.currentUser = this.SDS.getCurrentUser();
    //         this.setUserLikes();
    //         if (this.currentUser === null) {
    //           window.localStorage.setItem('navPath', `/active/${Number.parseInt(params.get('id'))}`);
    //         } else {
    //           window.localStorage.setItem('navPath', '/mine');
    //         }
            
    //       })
          
    //   );
    //   this.baseUrl = window.location.pathname.replace(/\/\d+$/g, '');
    // if (this.apartment) {
    //   this.getApartmentLikers();
    //   this.getApartmentCreator();
    // }

    
    
    //   //if this is not null, use method; otherwise likeCount = 0; 
    //  this.setUserLikes();
    //  this.currentUser = this.SDS.getCurrentUser();
     
    
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
