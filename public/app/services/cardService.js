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

        this.getLink = function (cardId, linkId) {
            if (linkId) {
                return $http.get("/api/links/" + cardId + "/" + linkId);
            }
        }

        this.saveLink = function (cardId, link) {
            return $http.post("/api/links/" + cardId, link);

        }

        this.removeLink = function (cardId, linkId) {
            return $http.get("/api/removelink/" + cardId + "/" + linkId);
        }

    }])
}())