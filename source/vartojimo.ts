import Loan from "./loan";

export default class Vartojimo extends Loan{
    type: string;
    interest_rate: number;
    max_period_years : number = 5;

    constructor(size: number, period: number, type: string)
    {
        super(size, period, 10000, 200);
        this.type = type;
        this.interest_rate = this.count_interest_rate();
    }

    total_amount() : number{
        this.interest_rate = this.count_interest_rate();
        let total: number =  this.size * (1 + 1 * ( this.interest_rate /100) + 
        2 * ( this.period / 365 ) * ( this.interest_rate /100) );

        total = Number(Math.round(total).toFixed(2));
        return total;
    }

    count_interest_rate () : number{
        if ( this.type === 'automobilis' )
            return 30;
        else if ( this.type === 'buitine technika' )
            return 50;
        else if ( this.type === 'elektronika' )
            return 35;

        return 40;
    }

}