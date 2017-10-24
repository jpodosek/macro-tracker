import { Component, OnInit } from '@angular/core';
import { WeightTrackerService } from "../weight-tracker-data/weight-tracker.service";
import { Weight } from "../weight";
import { Router } from "@angular/router";

@Component({
  selector: 'app-weight-tracker',
  templateUrl: './weight-tracker.component.html',
  styleUrls: ['./weight-tracker.component.css']
})
export class WeightTrackerComponent implements OnInit {
  weightHistory: Weight[];
  error: String;

  private date: Date;
  private bodyweight: number;
  private avgBodyweight: number;
  private changeBodyweight: number;
  private bodyfat: number;
  private changeBodyfat: number;
  private bodyCompGoal: string;
  private macros: string;
  private carbCycling: string;
  private trainingProgram: string;
  private comments: string;


  constructor(private data: WeightTrackerService, private router: Router) { 

  }

  ngOnInit() {
    this.getHistory();
  }

  createEntry() {
    console.log("add entry ran");
     this.data
          .createWeightEntry(this.date, this.bodyweight,this.avgBodyweight,this.changeBodyweight, this.bodyfat, this.changeBodyfat, this.bodyCompGoal, this.macros, this.carbCycling, this.trainingProgram, this.comments)
            .subscribe(
                weight => {
                 if (weight) {
                    this.getHistory()
                   //we'll want to show this newly added row. probably need to create List of Weight Entries
                   console.log("weight returned on subscribe");
                  } else {
                   e => this.error = 'Oops! We ran into the following error: ' + e
                 }
               },
                
             );
              
  }

   getHistory() {
    
      console.log("getHistory");
    this.data
      .getMyWeightHistory()  
      .subscribe(
        weightHistory => this.weightHistory = weightHistory.sort(),
        //weightHistory => this.weightHistory = weightHistory, //take Weight[] returned and set it equal to instance variable
        () => this.error = 'Could not load apartment data'

      );

  }
}
