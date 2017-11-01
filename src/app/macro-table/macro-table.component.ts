import { Component, Input, Output, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Day } from "../day";
import { DayDto } from "../day-dto";
import { MacroDataService } from "../macro-data/macro-data.service";

@Component({
  selector: 'app-macro-table',
  templateUrl: './macro-table.component.html',
  styleUrls: ['./macro-table.component.css']
})
export class MacroTableComponent implements OnInit {
  weekMacros: Day[]
  weekDtoMacros: DayDto[]
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

  mondayDto: DayDto;
  tuesdayDto: DayDto;
  wednesdayDto: DayDto;
  thursdayDto: DayDto;
  fridayDto: DayDto;
  saturdayDto: DayDto;
  sundayDto: DayDto;
  
  

  constructor(private data: MacroDataService ) {
    // this.dailyCalories = 0;
    // this.carbMacroInput = 300;
    // this.fatMacroInput = 100;
    // this.proteinMacroInput = 175;

    // this.mondayCarbVariance = 1.0;
    // this.mondayFatVariance = 1.0;
    // this.tuesdayCarbVariance = 1.0;
    // this.tuesdayFatVariance = 1.0;
    // this.wednesdayCarbVariance = 1.0;
    // this.wednesdayFatVariance = 1.0;
    // this.thursdayCarbVariance = 1.0;
    // this.thursdayFatVariance = 1.0;
    // this.fridayCarbVariance = 1.0
    // this.fridayFatVariance = 1.0;
    // this.saturdayCarbVariance = 1.0;
    // this.saturdayFatVariance = 1.0;
    // this.sundayCarbVariance = 1.0
    // this.sundayFatVariance = 1.0;

   
  }

  ngOnInit() { 
    this.getHistory();
   // this.calculate(); 
    // this.sunday = new Day(this.weekMacrosDto.pop, this.fatMacroInput, this.proteinMacroInput, this.mondayCarbVariance, this.mondayFatVariance); 
  
    // for (var day in this.weekMacrosDto) {
    //  console.log(day);
    // }
//     var test = [7,8,9];
// for (var i in test) {
//    console.log(i + ': ' + test[i]);
// } 
  }

  calculate() {
    this.monday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.mondayCarbVariance, this.mondayFatVariance);
    this.tuesday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.tuesdayCarbVariance, this.tuesdayFatVariance);
    this.wednesday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.wednesdayCarbVariance, this.wednesdayFatVariance);
    this.thursday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.thursdayCarbVariance, this.thursdayFatVariance);
    this.friday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.fridayCarbVariance, this.fridayFatVariance);
    this.saturday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.saturdayCarbVariance, this.saturdayFatVariance);
    this.sunday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.sundayCarbVariance, this.sundayFatVariance);

    this.calculateDailyCalories();
  }

 


 

  getHistory() {
    console.log("getHistory ran");
    this.data
      .getCurrentWeekMacros()  
      .subscribe(
        weekDtoMacros => {
          if (weekDtoMacros[0] != null) {
            this.weekDtoMacros = weekDtoMacros
             console.log("this fart logic ran")
             this.setValuesFromDatabase()
           
             
           
          } else {
            console.log("this.weekDtoMacros was empty")
            e => this.error = 'Error retrieving current macro data.'
          }
        }
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

  }

   calculateDailyCalories() {

    this.dailyCalories = (+this.carbMacroInput * 4)
      + (+this.fatMacroInput * 9)
      + (+this.proteinMacroInput * 4);
  }

   setValuesFromDatabase() {

             this.carbMacroInput = this.weekDtoMacros[0].carbMacroInput;
             this.fatMacroInput = this.weekDtoMacros[0].fatMacroInput;
             this.proteinMacroInput = this.weekDtoMacros[0].proteinMacroInput;

             this.mondayCarbVariance = this.weekDtoMacros[0].carbVariance;
             this.tuesdayCarbVariance = this.weekDtoMacros[1].carbVariance;
             this.wednesdayCarbVariance = this.weekDtoMacros[2].carbVariance;
             this.thursdayCarbVariance = this.weekDtoMacros[3].carbVariance;
             this.fridayCarbVariance = this.weekDtoMacros[4].carbVariance;
             this.saturdayCarbVariance = this.weekDtoMacros[5].carbVariance;
             this.sundayCarbVariance = this.weekDtoMacros[6].carbVariance;

             this.mondayFatVariance = this.weekDtoMacros[0].fatVariance;
             this.tuesdayFatVariance = this.weekDtoMacros[1].fatVariance;
             this.wednesdayFatVariance = this.weekDtoMacros[2].fatVariance;
             this.thursdayFatVariance = this.weekDtoMacros[3].fatVariance;
             this.fridayFatVariance = this.weekDtoMacros[4].fatVariance;
             this.saturdayFatVariance = this.weekDtoMacros[5].fatVariance;
             this.sundayFatVariance = this.weekDtoMacros[6].fatVariance;




             this.calculate();

            //  this.tuesday = new Day(this.carbMacroInput, this.fatMacroInput, this.proteinMacroInput, this.tuesdayCarbVariance, this.tuesdayFatVariance);
      
            
  }



}
