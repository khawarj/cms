(function () {

    var app = angular.module("cms");

    app.controller("linkCtrl", ["$scope", "$routeParams", "cardService", "$location", function ($scope, $routeParams, cardService, $location) {

        $scope.buttonText = "Create";
        $scope.cardId = $routeParams.cardId;
        if ($routeParams.cardId) {
            if ($routeParams.id && $routeParams.id != 0) {
                $scope.buttonText = "Update";
                cardService.getLink($routeParams.id).then(function (res) {
                    $scope.card = res.data;
                })
            }

            $scope.CreateLink = function () {
                cardService.saveLink($scope.cardId, {link: $scope.link}).then(function (res) {
                    $scope.buttonText = "Update";
                    $scope.card = res.data;
                })
            }



        } else {
            $location.path("/home");
        }

    }])


}())