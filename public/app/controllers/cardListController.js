(function () {
    var app = angular.module("cms");

    app.controller("cardListCtrl", ["$scope", "cardService", function ($scope, cardService) {
        $scope.cards = [];
        cardService.getCards().then(function (res) {
            console.log(res);
            $scope.cards = res.data;
        })
    }])
}())