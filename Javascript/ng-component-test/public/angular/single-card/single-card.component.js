(function() {
    let app = angular.module('cardApp');
    
    function CardCtrl() {
        let ctrl = this;

        ctrl.$onInit = function () {
            console.log('card "%s" with cost %d initialized', ctrl.title, ctrl.cost);
        };
        
        ctrl.cost = 0;
        ctrl.title = 'Card title';
        ctrl.imgUrl = 'http://s3.amazonaws.com/conquestdb2/image/card/en/12-wotc/094-reclusiam-templars.jpg';
        ctrl.traits = [];
        ctrl.description = '(description goes here)';
    }

    app.component('singleCard', {
        templateUrl: '/angular/single-card/single-card.component.html',
        transclude: true,
        bindings: {
            title: '@',
            cost: '<',
            imgUrl: '@',
            traits: '<'
        },
        controller: CardCtrl
    });
}());