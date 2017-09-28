import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { Apartment } from "../apartment";
import { SessionDataService } from "../session-data/session-data.service";
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
  baseUrl = 'http://localhost:4567/api/apartments';

  constructor(private data: SessionDataService, private data2: ApartmentDataService, private router: Router) { }

  ngOnInit() {
       
      this.currentUser = this.data.getCurrentUser();
  }

   clickActivate() {
     console.log("activate click Ran");
     this.data2
      .activateApartment(this.apartment)
        .subscribe(
           apartment => this.setApartmentAndFireEvent(apartment),
         e => this.message = 'Oops! We ran into the following error: ' + e
                  );

  }

  clickDeactivate() {
    console.log("deactivate Ran");
    this.data2
      .deactivateApartment(this.apartment)
        .subscribe(
          apartment => this.setApartmentAndFireEvent(apartment),
         e => this.message = 'Oops! We ran into the following error: ' + e
      );
  }

  private setApartmentAndFireEvent(apartment) {
    this.apartment = apartment;
    this.apartmentChanged.emit();
  }

}
