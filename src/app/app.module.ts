//Third party stuff
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';
import { FormsModule } from '@angular/forms';
//Components
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ApartmentListingsComponent } from './apartment-listings/apartment-listings.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { LoginComponent } from './login/login.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MacroTableComponent } from './macro-table/macro-table.component';
//Services
import { ApartmentDataService } from './apartment-data/apartment-data.service';
import { SessionDataService } from './session-data/session-data.service';
import { WeightTrackerComponent } from './weight-tracker/weight-tracker.component';
import { WeightTrackerDataServiceComponent } from './weight-tracker-data-service/weight-tracker-data-service.component';



const routes: Route[] = [
  { path: 'macros', component: MacroTableComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'my-listings', component: MyListingsComponent},
  { path: 'add-listing', component: AddListingComponent}, 
  { path: 'apartments-listings',      component: ApartmentListingsComponent },
  { path: '',      component: WeightTrackerComponent }  
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ApartmentListingsComponent,
    ApartmentDetailComponent,
    LoginComponent,
    MyListingsComponent,
    AddListingComponent,
    SignUpComponent,
    MacroTableComponent,
    WeightTrackerComponent,
    WeightTrackerDataServiceComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers:[ApartmentDataService, //singleton, bc at module level
  SessionDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
