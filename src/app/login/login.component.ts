import { Component, OnInit } from '@angular/core';
import { SessionDataService } from "../session-data/session-data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  private email: string;
  private password: string;
  private message: string;

  constructor(private data: SessionDataService) { }

  ngOnInit() {
  }
 

  submitCredentials() {
   this.data
   .login(this.email, this.password)
   .subscribe(
      user => this.message = 'Your name is ' + user.first_name,
      e => this.message = 'Uh oh. Error: ' + e
   );
  }

}
