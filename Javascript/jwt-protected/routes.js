var route1 = function (req, res) {
    res.send('this is route1');
};

var route2 = function (req, res) {
    res.send('this is route2');
};

module.exports = {
    route1: route1,
    route2: route2
};
