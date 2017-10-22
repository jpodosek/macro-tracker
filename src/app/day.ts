
export class Day {

    
    carbQty: number;
    fatQty: number;
    proteinQty: number;
    dailyCalorieTotal: number;
//    private fatMacroInput: number;
//    private proteinMacroInput: number;

//    carbVariance: number;
//    fatVariance: number

// public constructor(carbMacroInput: number, fatMacroInput: number, proteinMacroInput: number, carbVariance: number, fatVariance: number) {
//         this.carbMacroInput = carbMacroInput;
//         this.fatMacroInput = fatMacroInput;
//         this.proteinMacroInput = proteinMacroInput;
//         this.carbVariance = carbVariance;
//         this.fatMacroInput = fatMacroInput;
// }

   public constructor(
        private carbMacroInput, private fatMacroInput, private proteinMacroInput, private carbVariance, private fatVariance) {
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
