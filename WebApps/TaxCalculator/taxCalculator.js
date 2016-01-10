// use this for 2016 taxes
var taxBrackets = {
    //               10%   15%   25%   28%   33%   35%   39.6%
    taxPercentages: [0.10, 0.15, 0.25, 0.28, 0.33, 0.35, 0.396],

    // array values are starting values for their respective tax brackets
    brackets : {
        single:                [0,  9275, 37650,  91150, 190150, 413350, 415050, null],
        headOfHousehold:       [0, 13250, 50400, 130150, 210800, 413350, 441100, null],
        marriedJointFiling:    [0, 18550, 75300, 151900, 231450, 413350, 466950, null],
        marriedSeparateFiling: [0,  9275, 37650,  75950, 115725, 206675, 233475, null]
    },

    getBracket : function(filingStatus) {
        return this.brackets[filingStatus];
    }

};

function getTaxOwedByBrackets(taxableIncome, deductions, filingStatus) {
    var taxBracket = taxBrackets.getBracket(filingStatus);
    // find upper limit of a tax bracket below taxable income
    // modify the tax bracket array to only reflect relevant income
    for (var i = 1; i < taxBracket.length; i++) {
        if (taxableIncome < taxBracket[i] || taxBracket[i] == null) {
            taxBracket = taxBracket.slice(0, i);
            taxBracket.push(taxableIncome);
            break;
        }
    }
    // get the fed tax owed as per bracket amounts
    return taxBracket.map(function (c, i, a) {
        if (a[i + 1] == undefined) {
            return 0;
        }
        return (a[i + 1] - c) * taxBrackets.taxPercentages[i]
    });
}

function getFicaSocialSecurityTax(grossIncome) {
    var taxPercent = 0.0765;
    return taxPercent*grossIncome;
}

// taxable income data
var filingStatus = "marriedJointFiling";
var grossIncome = 100000; // -> get this amt from user
var deductions = 24000; // -> get this amt from user
var taxableIncome = grossIncome - deductions;

var incomeTaxOwedByBrackets = getTaxOwedByBrackets(taxableIncome, deductions, filingStatus);
var incomeTaxOwedTotal = incomeTaxOwedByBrackets.reduce(function(p,c) {return p+c;});

var fedTaxOwedTotal = incomeTaxOwedTotal + getFicaSocialSecurityTax(grossIncome);
