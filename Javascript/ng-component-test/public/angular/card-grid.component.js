(function() {
    let app = angular.module('cardApp', []);

    function CardGridCtrl() {
        let ctrl = this;
        ctrl.cards = [
            {
                title: 'card 1',
                cost: 2,
                imgUrl: 'unknown',
                traits: ['Limited', 'Renown']
            },
            {
                title: 'card 2',
                cost: 3,
                imgUrl: 'unknown',
                traits: ['Limited', 'Renown', 'Scheme']
            }
        ];
    }
    
    app.component('cardGrid', {
        templateUrl: '/angular/card-grid.component.html',
        controller: CardGridCtrl
    });
}());