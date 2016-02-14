

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
                <select id={this.props.id}>
                    {optionNodes}
                </select>
            </div>
        );
    }
});

var LabeledNumberInput = React.createClass({
    handleChange: function (event) {
        console.log(event.target.value);
    },

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

    render: function () {
        return (
            <div>
                <h2>Calculation</h2>
                <LabeledSelector id="filing-status" label="Filing Status"
                    optionData={[
                    { value: "single", innerText: "Single" },
                    { value: "headOfHouseHold", innerText: "Head of Household" },
                    { value: "marriedFilingJointly", innerText: "Married Filing Jointly" },
                    { value: "marriedSeparateFiling", innerText: "Married Filing Separately" }
                ]}/>
                <LabeledNumberInput id="gross-income" label="Gross Income $" />
                <LabeledNumberInput id="fed-deductions" label="Fed Deductions $" />
                <button id="calculate-btn">Calculate</button>
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

// TODO: complete this
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