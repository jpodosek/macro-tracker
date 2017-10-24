import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Day } from "../day";

@Component({
  selector: 'app-macro-table',
  templateUrl: './macro-table.component.html',
  styleUrls: ['./macro-table.component.css']
})
export class MacroTableComponent implements OnInit {
  week: Day[];
  carbMacroInput: number
  fatMacroInput: number
  proteinMacroInput: number
  dailyCalories: number

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

  constructor() {

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

    this.calculate();
  }

  ngOnInit() { }

  calculate() {
    this.monday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.mondayCarbVariance, this.mondayFatVariance);
    this.tuesday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.tuesdayCarbVariance, this.tuesdayFatVariance);
    this.wednesday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.wednesdayCarbVariance, this.wednesdayFatVariance);
    this.thursday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.thursdayCarbVariance, this.thursdayFatVariance);
    this.friday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.fridayCarbVariance, this.fridayFatVariance);
    this.saturday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.saturdayCarbVariance, this.saturdayFatVariance);
    this.sunday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.sundayCarbVariance, this.sundayFatVariance);

    this.calculateDailyCalories();
    console.log(this.monday.carbQty);
    console.log(this.monday.dailyCalorieTotal);
  }


  calculateDailyCalories() {

    this.dailyCalories = (+this.carbMacroInput * 4)
      + (+this.fatMacroInput * 9)
      + (+this.proteinMacroInput * 4);
  }

  save() {
    this.week = [this.monday, this.tuesday, this.wednesday, this.thursday, this.friday, this.saturday, this.sunday];

    //stick all the daily objects into a weekly array object od type day
    //dataa service can subscribe to this and respond
    for (var i = 0; i < this.week.length; i++) {
      console.log(this.week[i])
    }
  }



}
