import { Component, OnInit } from '@angular/core';
import { SessionDataService } from "../session-data/session-data.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  private email: string;
  private password: string;
  private first_name: string;
  private last_name: string;
  private message: string;

  constructor(private data: SessionDataService, private router: Router) { }

  signupFormSubmit() {
  this.data
    .createUser(this.email, this.password, this.first_name, this.last_name)
    .subscribe(
          user => {
                 if (user) {
                   this.router.navigate(['/my-listings']);
                 } else {
                   this.message = 'Could not log in with those credentials';
                 }
               },
                e => this.message = 'Oops! We ran into the following error: ' + e
             );


  }

  ngOnInit() {
  }

}
