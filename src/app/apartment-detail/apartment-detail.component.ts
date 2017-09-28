import { Component, OnInit, Input } from '@angular/core';
import { ApartmentDataService } from '../apartment-data/apartment-data.service';
import { Apartment } from "../apartment";
import { SessionDataService } from "../session-data/session-data.service";
import { User } from "../user";

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrls: ['./apartment-detail.component.css']
})
export class ApartmentDetailComponent implements OnInit {

  @Input() //this passes apartment from Apartment-Listing componenet
  apartment: Apartment;
  currentUser: User;
  error: String;
  baseUrl = 'http://localhost:4567/api/apartments';

  constructor(private data: SessionDataService, private data2: ApartmentDataService) { }

  ngOnInit() {
       
      this.currentUser = this.data.getCurrentUser();

  }

   activateApartment() {
     console.log("activate Ran");
     this.data2.activateApartment(this.apartment);

  }

  deactivateApartment() {
    console.log("deactivate Ran");
    this.data2.deactivateApartment(this.apartment);
  }


}
