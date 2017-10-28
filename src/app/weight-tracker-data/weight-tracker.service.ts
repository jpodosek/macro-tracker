import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Weight } from "../weight";
import 'rxjs/add/operator/map';

@Injectable()
export class WeightTrackerService {

  baseUrl = 'http://localhost:8080/api/weight';
  options = { withCredentials: true };

  constructor(private http: Http) { }

  createWeightEntry(date: Date, bodyweight: number, avgBodyweight: number, changeBodyweight: number, bodyfat: number, changeBodyfat: number, bodyCompGoal: string, macros: string, carbCycling: string, trainingProgram: string, comments: string):
    Observable<Weight> {
    console.log('createWeightEntry ran');
    const payload = { date, bodyweight, avgBodyweight, changeBodyweight, bodyfat, changeBodyfat, bodyCompGoal, macros, carbCycling, trainingProgram, comments };
    return this.http
      .post(this.baseUrl, payload, this.options)
      .map(response => response.json());
  }


  getMyWeightHistory(): Observable<Weight[]> {
    return this.http
      .get(this.baseUrl, this.options)
      .map(response => response.json());
  }

}



