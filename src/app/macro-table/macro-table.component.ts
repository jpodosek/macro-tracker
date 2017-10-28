import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Day } from "../day";
import { MacroDataService } from "../macro-data/macro-data.service";

@Component({
  selector: 'app-macro-table',
  templateUrl: './macro-table.component.html',
  styleUrls: ['./macro-table.component.css']
})
export class MacroTableComponent implements OnInit {
  weekMacros: Day[]
  carbMacroInput: number
  fatMacroInput: number
  proteinMacroInput: number
  dailyCalories: number
  error: String

  mondayCarbVariance: number
  tuesdayCarbVariance: number
  wednesdayCarbVariance: number
  thursdayCarbVariance: number
  fridayCarbVariance: number
  saturdayCarbVariance: number
  sundayCarbVariance: number

  mondayFatVariance: number
  tuesdayFatVariance: number
  wednesdayFatVariance: number
  thursdayFatVariance: number
  fridayFatVariance: number
  saturdayFatVariance: number
  sundayFatVariance: number

  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
  sunday: Day;
  
  

  constructor(private data: MacroDataService ) {

    this.dailyCalories = 0;
    this.carbMacroInput = 300;
    this.fatMacroInput = 100;
    this.proteinMacroInput = 175;

    this.mondayCarbVariance = 1.0;
    this.mondayFatVariance = 1.0;
    this.tuesdayCarbVariance = 1.0;
    this.tuesdayFatVariance = 1.0;
    this.wednesdayCarbVariance = 1.0;
    this.wednesdayFatVariance = 1.0;
    this.thursdayCarbVariance = 1.0;
    this.thursdayFatVariance = 1.0;
    this.fridayCarbVariance = 1.0
    this.fridayFatVariance = 1.0;
    this.saturdayCarbVariance = 1.0;
    this.saturdayFatVariance = 1.0;
    this.sundayCarbVariance = 1.0
    this.sundayFatVariance = 1.0;

   
  }

  ngOnInit() { 
    this.getHistory();
    this.calculate(); 
  }

  calculate() {
    this.monday = new Day("Monday", this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.mondayCarbVariance, this.mondayFatVariance);
    this.tuesday = new Day("Tuesday", this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.tuesdayCarbVariance, this.tuesdayFatVariance);
    this.wednesday = new Day("Wednesday", this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.wednesdayCarbVariance, this.wednesdayFatVariance);
    this.thursday = new Day("Thursday", this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.thursdayCarbVariance, this.thursdayFatVariance);
    this.friday = new Day("Friday", this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.fridayCarbVariance, this.fridayFatVariance);
    this.saturday = new Day("Saturday", this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.saturdayCarbVariance, this.saturdayFatVariance);
    this.sunday = new Day("Sunday", this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.sundayCarbVariance, this.sundayFatVariance);

    this.calculateDailyCalories();
  }


  calculateDailyCalories() {

    this.dailyCalories = (+this.carbMacroInput * 4)
      + (+this.fatMacroInput * 9)
      + (+this.proteinMacroInput * 4);
  }

  getHistory() {
    console.log("getHistory ran");
    this.data
      .getCurrentWeekMacros()  
      .subscribe(
        weekMacros => this.weekMacros = weekMacros,
        () => this.error = 'Error retrieving current macro data.'

      );
  }

  save() {
    this.weekMacros = [this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday];
    console.log("save ran")
    this.data
      .saveMacroEntry(this.weekMacros)
        .subscribe(           
            weekMacros => {
              if (weekMacros) {
                weekMacros => this.weekMacros = weekMacros;
               // this.getHistory()
                console.log("weekMacros returned on subscribe");
                console.log("weekmacros object:" + this.weekMacros);
              }
               else {
                   e => this.error = 'Oops! We ran into the following error: ' + e
                 }
            }
        );
   // this.weekMacros = [this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday];


    //stick all the daily objects into a weekMacrosly array object od type day
    //dataa service can subscribe to this and respond

  }

  



}
