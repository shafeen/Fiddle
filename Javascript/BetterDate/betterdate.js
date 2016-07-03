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

Date.prototype.moveYear = function (num) {
    if (!isNaN(num)) {
        this.setFullYear(this.getFullYear() + parseInt(num));
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

Date.prototype.toNextSunday = function () {
    this.toNextSpecifiedDay(dateNumMap.Sunday);
};
Date.prototype.toNextMonday = function () {
    this.toNextSpecifiedDay(dateNumMap.Monday);
};
Date.prototype.toNextTuesday = function () {
    this.toNextSpecifiedDay(dateNumMap.Tuesday);
};
Date.prototype.toNextWednesday = function () {
    this.toNextSpecifiedDay(dateNumMap.Wednesday);
};
Date.prototype.toNextThursday = function () {
    this.toNextSpecifiedDay(dateNumMap.Thursday);
};
Date.prototype.toNextThursday = function () {
    this.toNextSpecifiedDay(dateNumMap.Thursday);
};
Date.prototype.toNextFriday = function () {
    this.toNextSpecifiedDay(dateNumMap.Friday);
};
Date.prototype.toNextSaturday = function () {
    this.toNextSpecifiedDay(dateNumMap.Saturday);
};

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
