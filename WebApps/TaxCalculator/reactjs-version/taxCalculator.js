
var LabeledSelector = React.createClass({
    render: function () {
        var optionNodes = this.props.optionData.map(function (option) {
            return (
                <option value={option.value}>{option.innerText}</option>
            );
        });
        return (
            <div>
                <label for={this.props.id}>{this.props.label}</label>
                <select id={this.props.id}>
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
                <label for={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type="number" disabled={this.props.disabled=="y"}/>
            </div>
        );
    }
});

// TODO: complete this
// TODO: read up on Flux architectural pattern
ReactDOM.render(
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

        <hr/>

        <h2>Summary</h2>
        <LabeledNumberInput id="fed-income-taxes-owed" label="Fed Income Taxes Owed $" disabled="y" />
        <LabeledNumberInput id="fica-soc-taxes-owed" label="FICA/Social Security Owed $" disabled="y" />
        <LabeledNumberInput id="net-income" label="Net Income $" disabled="y" />
    </div>,
    document.getElementById("container")
);