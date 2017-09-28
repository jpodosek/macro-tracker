import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../user';
import { Http } from '@angular/http';
import { Subject } from "rxjs/Subject";

import 'rxjs/add/operator/do';

@Injectable()
export class SessionDataService {

  baseUrl = 'http://localhost:4567/api/sessions';
  options = { withCredentials: true};
  private currentUser: User;
  //subject is a specific channel of communication
  //other components can subscribe to userChanged event, listen for and act
  //methods below will be source of info for subject; can pass info through it
  userChanged: Subject<User>;

  constructor(private http: Http) { 
    this.userChanged = new Subject<User>();

  }

  login(email: string, password: string): Observable<User>{
    const payload = { email, password }; //creates property with name email to value of the same name; like email: email, password: password
    return this.http
      .post(this.baseUrl, payload, this.options)
      .map(response => response.status === 201 ? response.json(): null) //this produces a User object; response is juat a variable name
      .do(user=> this.currentUser = user) //resets current user field
      .do(user => this.userChanged.next(user)); //when a user goes by - emit an event; user here is just a variable name
  }

  logout(): Observable<User>{
    return this.http
      .delete(`${this.baseUrl}/mine`, this.options)
      .map(response => null) //TODO come back and finish failure
      .do(user=> this.currentUser = user) //resets current user field
      .do(user=> this.userChanged.next(user)); //broadcast stuff happened
      
  }

  getCurrentUser() {
   return this.currentUser;
  }



}
