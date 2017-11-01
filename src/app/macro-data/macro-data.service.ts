import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Weight } from "../weight";
import { Day } from "../day";
import { DayDto } from "../day-dto";
import 'rxjs/add/operator/map';

@Injectable()
export class MacroDataService {

baseUrl = 'http://localhost:8080/api/macro';
options = { withCredentials: true };
 


  constructor(private http: Http) { }

  

   saveMacroEntry(week: Day[]):
    Observable<Day[]> {
    console.log('saveMacroEntry ran');
    const payload = week;
    return this.http
      .post(this.baseUrl, payload, this.options)
      .map(response => response.json());
  }

  getCurrentWeekMacros(): Observable<DayDto[]> {
    console.log('getCurrentWeekMacros ran');
    return this.http
      .get(this.baseUrl, this.options)
      .map(response => response.json())
     
      
      ;
  }

}
