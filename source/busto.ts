import Loan from "./loan";

export default class Busto extends Loan{
    salary: number;
    kids: number;
    interest_rate: number = 2;
    max_period_years : number = 30;
    max_size = this.count_max_size();

    constructor(size: number, period: number, salary: number, kids: number)
    {
        super(size, period, 25000, 1000);
        this.salary = salary;
        this.kids = kids;
    }

    total_amount() : number{
        let sal_rate = ( 0.1 * this.salary );    
        let kids_rate =  this.size / this.period * this.kids;    

        let total : number =  this.size * (1 + 1 * ( this.interest_rate /100)) +
        0.5 * ( this.period / 365 ) * ( this.interest_rate /100)  + sal_rate + kids_rate;

        total = Number(Math.round(total).toFixed(2));
        return total;
    }

    count_max_size () : number{
        let average_salary = 700;
        if ( this.kids > 0 )
        {
            if ( this.kids > 1 )
            {
                if ( this.salary > average_salary)
                    return 60000;
                else
                    return 35000;
            }
            else
                return 70000;
        }
        else
            if ( this.salary > average_salary )
                return 40000;

        return 25000;
    }
}