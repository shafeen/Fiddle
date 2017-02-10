(function() {
    let app = angular.module('cardApp', []);
    
    function CardCtrl() {
        let ctrl = this;

        ctrl.$onInit = function () {
            console.log('card "%s" with cost %d initialized', ctrl.title, ctrl.cost);
        };
        
        ctrl.title = 'Card Title';
        ctrl.imgUrl = 'Img';
        ctrl.traits = ['Limited', 'Intimidate'];
        
    }

    app.component('singleCard', {
        templateUrl: '/angular/single-card.component.html',
        transclude: true,
        bindings: {
            title: '<',
            cost: '<'
        },
        controller: CardCtrl
    });
}());