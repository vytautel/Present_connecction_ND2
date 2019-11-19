import Loan from "./loan";

export default class Greitoji extends Loan{
    interest_rate: number = 20;
    max_period_years : number = 2;

    constructor(size: number, period: number)
    {
        super(size, period, 5000, 100);
    }

    total_amount() : number{
        let total: number =  this.size * (1 + 1 * ( this.interest_rate /100) + 
        this.max_period_years * ( this.period / 365 ) * ( this.interest_rate /100) );
        
        total = Number(Math.round(total).toFixed(2));
        return total;
    }
} 