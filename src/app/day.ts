
export class Day {

    
    carbQty: number;
    fatQty: number;
    proteinQty: number;
    dailyCalorieTotal: number;
    carbVariance: number;
    fatVariance: number;
    dayName: String;
   
   public constructor(dayName,
        private carbMacroInput, private fatMacroInput, private proteinMacroInput, carbVariance,  fatVariance) {
            this.carbVariance = carbVariance;
            this.fatVariance = fatVariance;
            this.setCarbValue();
            this.setFatValue();
            this.setProteinValue();
            this.calculateDailyCalorieTotal();
        }

    setCarbValue() {
       this.carbQty = this.carbMacroInput * this.carbVariance;
    }

    setFatValue(){
        this.fatQty = this.fatMacroInput * this.fatVariance;
    }

    setProteinValue(){
        this.proteinQty = this.proteinMacroInput;
    }

    calculateDailyCalorieTotal(){
        this.dailyCalorieTotal = (this.carbQty * 4) + (this.fatQty * 9) + (this.proteinQty * 4);
    }

    

}
