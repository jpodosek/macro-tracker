import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Apartment } from '../apartment';
import 'rxjs/add/operator/map';

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
 

  

}
