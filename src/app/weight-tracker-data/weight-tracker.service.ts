import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Weight } from "../weight";
import 'rxjs/add/operator/map';

@Injectable()
export class WeightTrackerService {

  constructor(private http: Http) { }

      baseUrl = 'http://localhost:4567/api/weight-tracker';
 
  options = { withCredentials: true };


createWeightEntry(date: Date, bodyweight: number, avgBodyweight: number, changeBodyweight: number, bodyfat: number, changeBodyfat: number,
                  bodyCompGoal: string, macros: string, carbCycling: string, trainingProgram: string, comments: string): 
       Observable<Weight> {

     const payload = { bodyweight, avgBodyweight, changeBodyweight, bodyfat, changeBodyfat, bodyCompGoal, macros, carbCycling, trainingProgram, comments }; 
     return this.http
                  .post(this.baseUrl, payload, this.options)
                  .map(response => response.json()); 
    }


    getMyWeightHistory(): Observable<Weight[]> {
    return this.http
                .get(this.baseUrl + '/all',  this.options)
                .map(response => response.json()); 
  }

}


