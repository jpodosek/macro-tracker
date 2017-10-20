import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Apartment } from '../apartment';
import 'rxjs/add/operator/map';
import { User } from "../user";

@Injectable()
export class ApartmentDataService {
  baseUrl = 'http://localhost:4567/api/apartments';
 
  options = { withCredentials: true };
  
  constructor(private http: Http) { 
  }

  getActiveListings(): Observable<Apartment[]> {
    
    return this.http
                .get(this.baseUrl)
                .map(response => response.json()); //map response to whatever json was in there
  }

  getMyListings(): Observable<Apartment[]> {
    return this.http
                .get(this.baseUrl + '/mine',  this.options)
                .map(response => response.json()); 
  }

  activateApartment(apartment: Apartment): Observable<Apartment> {   
    return this.http
                .post('http://localhost:4567/api/apartments/' + apartment.id + '/activations', {}, this.options)
                .map(response => response.json()); 
              
  }

  deactivateApartment(apartment: Apartment): Observable<Apartment> {
    return this.http
                .post('http://localhost:4567/api/apartments/' + apartment.id + '/deactivations', {}, this.options)
                .map(response => response.json()); 
  }


   createApartment(rent: number,number_of_bedrooms: number, number_of_bathrooms: number, 
                  square_footage: number, address: string, city: string, 
                  state: string, zip_code: string): 
      Observable<Apartment> {

     const payload = { rent, number_of_bedrooms, number_of_bathrooms, square_footage, address, city, state, zip_code }; 
     return this.http
                  .post('http://localhost:4567/api/apartments', payload, this.options)
                  .map(response => response.json()); 
    }

    addLike(apartment: Apartment): Observable<Apartment> {
      console.log('addLike ran');
       return this.http
                .post('http://localhost:4567/api/apartments/' + apartment.id + '/like', {}, this.options)
                .map(response => response.status === 201 ? response.json(): null) //TODO come back and finish failure
    }
 
    getUsersThatHaveLiked(apartment: Apartment): Observable<User[]> {
      console.log('getUsersThatHaveLiked ran');
      //return a list of users
      //this can be used later for displaying users that have liked
      return this.http
                  .get('http://localhost:4567/api/apartments/' + apartment.id + '/like', this.options)
                  .map(response => response.status === 201 ? response.json(): null) //if User[] is null, stop function; let 0 default stay

    }

    getApartmentById(apartmentId : Number): Observable<Apartment> {
      console.log('getApartmentById Ran');
       return this.http
                .get('http://localhost:4567/api/apartments/' + apartmentId, this.options)
                .map(response => response.status === 201 ? response.json(): null) //TODO come back and finish failure
  
    }

}
