import { Component,Input, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-macro-table',
  templateUrl: './macro-table.component.html',
  styleUrls: ['./macro-table.component.css']
})
export class MacroTableComponent implements OnChanges, OnInit {
  @Input()  dailyCarbMacro: number  
  @Input()  dailyFatMacro: number
  @Input()  dailyProteinMacro: number
   dailyCalories: number;

  constructor() { 
   
    this.dailyCalories = 0;
  }

  ngOnInit() {
    
  
  }

 onClick() {
   this.calculateDailyCalories();
    console.log("onChange ran");

   console.log(this.dailyCarbMacro);
   console.log(this.dailyFatMacro);
   console.log(this.dailyProteinMacro);
 }

 ngOnChanges() {
   this.calculateDailyCalories();
  
  }

 calculateDailyCalories(){
   
   this.dailyCalories = (+this.dailyCarbMacro * 4) 
                      + (+this.dailyFatMacro * 9) 
                      + (+this.dailyProteinMacro  *4);
 }

}
