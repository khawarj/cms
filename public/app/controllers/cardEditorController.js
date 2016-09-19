(function () {
    var app = angular.module("cms");

    app.controller("cardEditorCtrl", ["$scope", "$routeParams", "cardService", function ($scope, $routeParams, cardService) {

        $scope.buttonText = "Create";
        if ($routeParams.id && $routeParams.id != 0) {
            $scope.buttonText = "Update";
            cardService.getCard($routeParams.id).then(function (res) {
                $scope.card = res.data;
            })
        }

        $scope.CreateCard = function () {
            var cardId;
            if ($routeParams.id && $routeParams.id != 0) {
                cardId = $routeParams.id;
            }
            cardService.saveCard(cardId, $scope.card).then(function (res) {
                $scope.buttonText = "Update";
                $scope.card = res.data;
            })
        }
    }])
}())