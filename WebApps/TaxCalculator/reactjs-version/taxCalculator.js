

var LabeledSelector = React.createClass({
    render: function () {
        var optionNodes = this.props.optionData.map(function (option) {
            return (
                <option value={option.value}>{option.innerText}</option>
            );
        });
        return (
            <div>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <select id={this.props.id} onChange={this.props.onChange}>
                    {optionNodes}
                </select>
            </div>
        );
    }
});

var LabeledNumberInput = React.createClass({
    render: function() {
        return (
            <div>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id}
                       type="number"
                       disabled={this.props.disabled=="y"}
                       onChange={this.props.onChange}
                       onClick={this.props.onClick}/>
            </div>
        );
    }
});

var TaxCalculator = React.createClass({
    getInitialState: function () {
        return {
            filingStatus: "single",
            grossIncome: 0,
            fedDeductions: 0
        }
    },

    updateFilingStatus: function(event) {
        this.setState({filingStatus: event.target.value});
        console.log("this is changing from updateFilingStatus");
    },

    updateGrossIncome: function(event) {
        this.setState({grossIncome: event.target.value});
        console.log("this is changing from updateGrossIncome");
    },

    updateFedDeductions: function(event) {
        this.setState({fedDeductions: event.target.value});
        console.log("this is changing from updateFedDeductions");
    },

    // use this for 2016 taxes
    taxBrackets: function() {
        return {
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
        }
    },

    getFicaSocialSecurityTax: function (grossIncome) {
        var taxPercent = 0.0765;
        return taxPercent*grossIncome;
    },

    getTaxOwedByBrackets: function(taxableIncome, deductions, filingStatus) {
        var taxBrackets = this.taxBrackets();
        var taxBracket = taxBrackets.getBracket(this.state.filingStatus);
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
    },

    calculateTaxSummary: function () {
        var incomeTaxOwedByBrackets = this.getTaxOwedByBrackets(this.state.grossIncome - this.state.fedDeductions,
            this.state.fedDeductions, this.state.filingStatus);
        var incomeTaxOwedTotal = incomeTaxOwedByBrackets.reduce(function(p,c) {return p+c;});
        var ficaSocialSecurityTax =this.getFicaSocialSecurityTax(this.state.grossIncome);

        // TODO: the following from the TaxSummary component should not be updated this way
        $("#fed-income-taxes-owed").val(incomeTaxOwedTotal);
        $("#fica-soc-taxes-owed").val(ficaSocialSecurityTax);
        var fedTaxOwedTotal = incomeTaxOwedTotal + ficaSocialSecurityTax;
        $("#net-income").val(this.state.grossIncome - fedTaxOwedTotal);
    },

    render: function () {
        return (
            <div>
                <h2>Calculation</h2>
                <LabeledSelector id="filing-status" label="Filing Status"
                    optionData={[
                        { value: "single", innerText: "Single" },
                        { value: "headOfHouseHold", innerText: "Head of Household" },
                        { value: "marriedJointFiling", innerText: "Married Filing Jointly" },
                        { value: "marriedSeparateFiling", innerText: "Married Filing Separately" }
                    ]}
                    onChange={this.updateFilingStatus}
                />
                <LabeledNumberInput id="gross-income" label="Gross Income $"
                                    onChange={this.updateGrossIncome} />
                <LabeledNumberInput id="fed-deductions" label="Fed Deductions $"
                                    onChange={this.updateFedDeductions}/>
                <button id="calculate-btn" onClick={this.calculateTaxSummary}>Calculate</button>
            </div>
        );
    }
});

var TaxSummary = React.createClass({
    getInitialState: function () {
        return {
            totalIncomeTaxOwed: 0,
            ficaSocialSecurityTax: 0,
            netIncome: 0
        }
    },

    render: function () {
        return (
            <div>
                <h2>Summary</h2>
                <LabeledNumberInput id="fed-income-taxes-owed" label="Fed Income Taxes Owed $" disabled="y" />
                <LabeledNumberInput id="fica-soc-taxes-owed" label="FICA/Social Security Owed $" disabled="y" />
                <LabeledNumberInput id="net-income" label="Net Income $" disabled="y" />
            </div>
        );
    }
});

// TODO: read up on Flux architectural pattern
// TODO: read up on Redux architectural pattern
ReactDOM.render(
    <div>
        <TaxCalculator />
        <hr/>
        <TaxSummary />
    </div>,
    document.getElementById("container")
);