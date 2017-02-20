(function() {
    let app = angular.module('cardApp');

    function CardGridCtrl($http) {
        let ctrl = this;
        
        // This data would normally be retrieved via a service
        ctrl.$onInit = function () {
            ctrl.cards = [
                {
                    cost: 3,
                    title: 'Reclusiam Templars',
                    imgUrl: 'http://s3.amazonaws.com/conquestdb2/image/card/en/12-wotc/094-reclusiam-templars.jpg',
                    traits: ['Soldier', 'Black Templars']
                },
                {
                    cost: 5,
                    title: 'The Emperor\'s Champion',
                    imgUrl: 'http://s3.amazonaws.com/conquestdb2/image/card/en/12-wotc/095-the-emperors-champion.jpg',
                    traits: ['Soldier', 'Black Templars', 'Elite']
                },
                {
                    cost: 1,
                    title: 'Vow of Honor',
                    imgUrl: 'http://s3.amazonaws.com/conquestdb2/image/card/en/12-wotc/097-vow-of-honor.jpg',
                    traits: ['Power', 'Vow']
                }
            ];
            console.log('Card grid initialized with cards: ', ctrl.cards);
            
            ctrl.refreshData = function () {
                console.log("Clicked the refresh button!");
                $http.get('/cards/refresh').then(
                    function success(response) {
                        ctrl.cards = response.data;
                    },
                    function failure(response) {
                        console.error("Could not retrieve cards from the specified url!");
                    }
                );
            };
        };
    }
    
    app.component('cardGrid', {
        templateUrl: '/angular/card-grid/card-grid.component.html',
        controllerAs: 'ctrl',
        controller: CardGridCtrl
    });
}());