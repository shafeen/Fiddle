var moment = require('moment');
var utility = require('./utility');
debugger;
alert(moment().format('MMMM Do YYYY, h:mm:ss a'));
alert("1 + 2 = " + utility.add(1,2));
alert("max(2, 3) = " + utility.max(3,2));

// if you want the vars accessible via the window!
//window.moment = moment;
//window.utility = utility;