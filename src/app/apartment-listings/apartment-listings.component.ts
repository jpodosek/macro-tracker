import { Component, OnInit } from '@angular/core';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { Apartment } from "../apartment";

@Component({
  selector: 'app-apartment-listings',
  templateUrl: './apartment-listings.component.html',
  styleUrls: ['./apartment-listings.component.css']
})
export class ApartmentListingsComponent implements OnInit {

  apartments: Apartment[];
  error: String;
  selectedApartment: Apartment;
  
  
  //defaults go in constructor
  constructor(private data: ApartmentDataService) { }

  selectApartment(apartment: Apartment) {
    this.selectedApartment = apartment;

  }

  hideButton() {
    this.selectedApartment = null;
  };

  //when you want to do something, put in Init
  ngOnInit() {
    this.data
      .getActiveListings()
      .subscribe(
        apartments => this.apartments = apartments,
        () => this.error = 'Could not load apartment data'

      );
  }

}
