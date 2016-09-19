(function () {

    var app = angular.module("cms");

    app.service("cardService", ["$http", function ($http) {

        this.getCards = function () {
            return $http.get("/api/cards");
        }

        this.getCard = function (id) {
            return $http.get("/api/cards/" + id);
        }

        this.saveCard = function (id, card) {
            if (id) {
                return $http.post("/api/cards/:" + id, card);
            } else {
                return $http.post("/api/cards", card);
            }

        }

    }])
}())