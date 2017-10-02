import { Component, OnInit } from '@angular/core';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { Apartment } from "../apartment";

@Component({
  selector: 'app-my-listings',
  templateUrl: './my-listings.component.html',
  styleUrls: ['./my-listings.component.css']
})
export class MyListingsComponent implements OnInit {

  apartments: Apartment[];
  error: String;
  selectedApartment: Apartment;

  constructor(private data: ApartmentDataService) {
  
   }

  selectApartment(apartment: Apartment) {
    this.selectedApartment = apartment;
  }

    hideButton() {
    this.selectedApartment = null;
  };

  updateApartmentList() {
    this.getLatest();
  }

  getLatest() {
    this.data
      .getMyListings()
      .subscribe(
        apartments => this.apartments = apartments,
        () => this.error = 'Could not load apartment data'

      );
  }
  
  ngOnInit() {
    this.getLatest();
  }

  
}
