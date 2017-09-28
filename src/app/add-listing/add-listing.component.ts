import { Component, OnInit } from '@angular/core';
import { ApartmentDataService } from "../apartment-data/apartment-data.service";
import { SessionDataService } from "../session-data/session-data.service";
import { User } from "../user";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  
  private rent: number;
  private number_of_bedrooms: number;
  private number_of_bathrooms: number;                
  private square_footage: number;                
  private address: string;                 
  private city: string;              
  private state: string; 
  private zip_code: string;
  private message: string;
  
  constructor(private data: ApartmentDataService, private data2: SessionDataService, private router: Router) {}

  ngOnInit() {}

  addListing() {
     this.data
          .createApartment(this.rent, this.number_of_bedrooms, this.number_of_bathrooms,
                           this.square_footage, this.address, this.city, this.state, this.zip_code)
            .subscribe(
                apartment => {
                 if (apartment) {
                   this.router.navigate(['/my-listings']);
                   console.log('apartment returned from spark: ' + apartment);
                  } else {
                   this.message = 'Hmmm. Apartment was not returned.';
                 }
               },
                e => this.message = 'Oops! We ran into the following error: ' + e
             );
              
  }

}
