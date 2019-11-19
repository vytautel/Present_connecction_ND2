import * as $ from "jquery";
import Greitoji from "./greitoji";
import Busto from "./busto";
import Vartojimo from "./vartojimo";
import Loan from "./loan";
let loan_type : string;
let g : Greitoji = new Greitoji(0, 0); 
let b : Busto = new Busto(0, 0, 0, 0); 
let v : Vartojimo = new Vartojimo(0, 0, ""); 

window.addEventListener('load', (event) => {
  
    document.getElementById("result_div").style.display = "none";
    document.getElementById("min_amount_warn").style.display = "none";
    document.getElementById("max_amount_warn").style.display = "none";

    loan_type = (<HTMLInputElement>document.getElementById("loan_type")).value;

    document.getElementById("size").oninput = function() 
    {
      if ( CheckInput() )
        LoanInfo();
    };
    document.getElementById("calendar").oninput = function()
    {
      if ( CheckInput() )
        LoanInfo();
    };

    if ( loan_type == "greitoji")
    {
      SetCalendar(2);
      SetMaxAmount(g.max_size);
      SetMinAmount(g.min_size);
      SetInterestRate(g.interest_rate);
    }
    else if (loan_type == "busto")
    {
      SetCalendar(30);
      SetMaxAmount(b.count_max_size());
      SetMinAmount(b.min_size);
      SetInterestRate(b.interest_rate);

      document.getElementById("kids").oninput = function() 
      {
        let busto : Busto = GetHouseLoanInputInfo(0, 0);
        SetMaxAmount( busto.count_max_size());

        if ( CheckInput() )
        LoanInfo();
      };
      document.getElementById("salary").oninput = function()  
      {
        let busto : Busto = GetHouseLoanInputInfo(0, 0);
        SetMaxAmount( busto.count_max_size());
        
        if ( CheckInput() )
        LoanInfo();
      };
    }
    else if (loan_type == "vartojimo")
    {
      SetCalendar(5);
      SetMaxAmount(v.max_size);
      SetMinAmount(v.min_size);
      
      v.type = (<HTMLSelectElement>document.getElementById("type")).value;
      v.count_interest_rate();
      SetInterestRate(v.interest_rate);

      document.getElementById("type").oninput = function()  
      {
         let vartojimo : Vartojimo = GetConsumeLoanInput();
         SetInterestRate( vartojimo.count_interest_rate());
        
        if ( CheckInput() )
          LoanInfo();
      };
    }
  });

  function SetInterestRate(int_rate : number)
  {
    document.getElementById("interest_rate").innerText = int_rate.toString();
  }

  function SetMaxAmount (max_am : number) : void
  {
    let elements = document.getElementsByClassName("max_amount");
    for ( let i = 0; i < elements.length; i++)
      (<HTMLElement>(elements[i])).innerText =  max_am.toString();

    document.getElementById("size").setAttribute("max", max_am.toString());
  }

  function SetMinAmount (min_am : number) : void
  {
    let elements = document.getElementsByClassName("min_amount");
    for ( let i = 0; i < elements.length; i++)
      (<HTMLElement>(elements[i])).innerText =  min_am.toString();

    document.getElementById("size").setAttribute("min", min_am.toString());
  }

  function SetCalendar (x_years_later_date_for_max : number) : void
  {
    let dateObj = new Date();
    dateObj.setDate(dateObj.getDate() + 1);

    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let tomorow_date = year + "-" + month + "-" + day;

    let max_date : string = (year + x_years_later_date_for_max) + "-" + month + "-" + day;

    document.getElementById("calendar").setAttribute("value", tomorow_date);
    document.getElementById("calendar").setAttribute("min", tomorow_date);
    document.getElementById("calendar").setAttribute("max", max_date);
    document.getElementById("max_years").innerText = x_years_later_date_for_max.toString();
  }

  function CheckInput() : boolean
  {
    let size : number = +(<HTMLInputElement>document.getElementById("size")).value;
    let ob : Loan;
    let max_size : number;
    let min_size : number;

    if ( loan_type == "greitoji")
      ob = g;
    else if (loan_type == "busto")
      ob = b;
    else if (loan_type == "vartojimo")
      ob = v;

    ob.size = size;
    
    max_size = ob.max_size;
    min_size = ob.min_size;

    if (loan_type == "busto")
    {
      (ob as Busto) = GetHouseLoanInputInfo(size, 0);
      max_size = (ob as Busto).count_max_size();
    }

    if ( size > max_size)
    {
      document.getElementById("result_div").style.display = "none";
      document.getElementById("max_amount_warn").style.display = "block";
      
      return false;
    }
    else if ( size < min_size )
    {
      document.getElementById("result_div").style.display = "none";
      document.getElementById("min_amount_warn").style.display = "block";
      document.getElementById("max_amount_warn").style.display = "none";
      
      return false;
    }

    document.getElementById("min_amount_warn").style.display = "none";
    document.getElementById("max_amount_warn").style.display = "none";
    return true;
  }

  function GetHouseLoanInputInfo(size : number, days: number): Busto
  {
    let salary : number = +(<HTMLInputElement>document.getElementById("salary")).value;
    let kids : number = +(<HTMLSelectElement>document.getElementById("kids")).value;
    let busto : Busto = new Busto (size, days, salary, kids );

    return busto;
  }

  function  GetConsumeLoanInput() : Vartojimo
  {
      let size : number = +(<HTMLInputElement>document.getElementById("size")).value;
      let days : number = CountDays();
      let type : string = (<HTMLSelectElement>document.getElementById("type")).value;
      return new Vartojimo (size, days, type);
  }

  function LoanInfo()
  {
    let month_payment : number;
    let total_payment : number;

    let size : number = +(<HTMLInputElement>document.getElementById("size")).value;
    let days : number = CountDays();

    document.getElementById("result_div").style.display = "block";

    if ( loan_type == "greitoji")
    {
      let greitoji : Greitoji = new Greitoji (size, days);
      total_payment = greitoji.total_amount();
    }
    else if ( loan_type == "busto")
    {
      let busto : Busto = GetHouseLoanInputInfo(size, days);

      total_payment = busto.total_amount();
      SetMaxAmount( busto.count_max_size());
    }
    else if ( loan_type == "vartojimo")
    {
       let type : string = (<HTMLSelectElement>document.getElementById("type")).value;
       let vartojimo : Vartojimo = new Vartojimo(size, days, type);
       
       SetInterestRate( vartojimo.count_interest_rate());
       
      total_payment = vartojimo.total_amount();
    }
    month_payment =  Count_Month_Payment(total_payment, days);

    document.getElementById("days_count").innerText = days.toString();
    document.getElementById("months_count").innerText = DaysToMonth(days).toString();
    document.getElementById("total_payment").innerText = total_payment.toString();

    if ( days < 30 )
      document.getElementById("month_pay_label").style.display = "none";
    else
    {
      document.getElementById("month_pay_label").style.display = "inline-block";
      document.getElementById("month_payment").innerText = month_payment.toString();
    }
  }

  function CountDays() : number
  {
    let date : Date = new Date((<HTMLInputElement>document.getElementById("calendar")).value);
    let now_Date : Date = new Date(Date.now());

    let days = (date.getTime() - now_Date.getTime()) /  (1000*60*60*24);
    return Math.ceil(days);
  }

  function Count_Month_Payment(tot_amount: number, days: number) : number
  {
    let mont_pay = tot_amount / ( days / 30 );
    mont_pay = Math.round(mont_pay);
    mont_pay = Number(mont_pay.toFixed(2));
    return mont_pay;
  }

  function DaysToMonth(days : number)
  {
    let months : number = ( days / 30 );
    months = Number(months.toFixed(1));
    return months;
  }