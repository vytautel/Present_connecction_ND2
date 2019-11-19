export default abstract class Loan {
    
    size:  number;
    period: number; // measured in days
    max_size : number;
    min_size : number;

    constructor(size: number, period: number, max_size : number, min_size : number )
    {
        this.size = size;
        this.period = period;
        this.max_size = max_size;
        this.min_size = min_size;
    }
}