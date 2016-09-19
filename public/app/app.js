(function () {

    var app = angular.module("cms", ['ngRoute']);

    app.config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider.when('/home', {
                templateUrl: "/public/templates/partials/home.html",
                controller: "homeCtrl"
            })
            .when("/cards", {
                template: "<h1>hello</h1>"
            })
            .otherwise('/home')
    }])

}())