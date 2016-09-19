(function () {

    var app = angular.module("cms", ['ngRoute']);

    app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider.when('/home', {
                templateUrl: "/public/templates/partials/home.html",
                controller: "homeCtrl"
            })
            .when("/cards/:id", {
                templateUrl: "/public/templates/partials/cardEditor.html",
                controller: "cardEditorCtrl"
            })
            .when("/cards", {
                templateUrl: "/public/templates/partials/cardList.html",
                controller: "cardListCtrl"
            })
            .when("/link/:id", {
                templateUrl: "/public/templates/partials/linkEditor.html",
                controller: "linkCtrl"
            })
            .otherwise('/home')
    }])

}())