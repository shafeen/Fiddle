Date.prototype.moveForward = function (num) {
    if (!isNaN(num)) {
        this.moveDate(num);
    }
};

Date.prototype.moveBackward = function (num) {
    if (!isNaN(num)) {
        this.moveDate(-1*num);
    }
};

Date.prototype.moveDate = function (num) {
    if (!isNaN(num)) {
        this.setDate(this.getDate() + parseInt(num));
    }
};

var dateNumMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6
};

function initToNextDayFunctions() {
    for (day in dateNumMap) {
        if (dateNumMap.hasOwnProperty(day)) {
            Date.prototype['toNext'+day] = function () {
                this.toNextSpecifiedDay(dateNumMap[day]);
            }
        }
    }
}
initToNextDayFunctions();

Date.prototype.toNextSpecifiedDay = function (day) {
    if (day >= 0 && day <= 6) {
        var currentDay = this.getDay();
        if (currentDay > day) {
            this.moveForward((6-currentDay)+1);
            this.moveForward(day);
        } else if (currentDay < day) {
            this.moveForward(day - currentDay);
        } else {
            // do nothing
        }
    }
};

// TODO: remove when done
function test() {
    var d = new Date();
    console.log(d);
    d.toNextTuesday();
    console.log(d);
};
test();
