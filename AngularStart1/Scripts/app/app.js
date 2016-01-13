// Main configuration file. Sets up AngularJS module and routes and any other config objects

var appRoot = angular.module('main', ['ui.bootstrap','ngRoute', 'ngGrid', 'ngResource', 'angularStart.services', 'angularStart.directives']);     //Define the main module

appRoot
    .config(['$routeProvider', function ($routeProvider) {
        //Setup routes to load partial templates from server. TemplateUrl is the location for the server view (Razor .cshtml view)
        $routeProvider
            .when('/home', { templateUrl: '/home/main', controller: 'MainController' })
            .when('/contact', { templateUrl: '/home/contact', controller: 'ContactController' })
            .when('/about', { templateUrl: '/home/about', controller: 'AboutController' })
            .when('/demo', { templateUrl: '/home/demo', controller: 'DemoController' })
            .when('/transaction', { templateUrl: '/home/transaction', controller: 'TransactionController' })
            .when('/angular', { templateUrl: '/home/angular' })
            .otherwise({ redirectTo: '/home' });
    }])
    .controller('RootController', ['$scope', '$route', '$routeParams', '$location', function ($scope, $route, $routeParams, $location) {
        $scope.$on('$routeChangeSuccess', function (e, current, previous) {
            $scope.activeViewPath = $location.path();
        });
    }]);

// directive changes child of "mywidget" red on click 
appRoot.directive("myWidget", function() {
    var linkFunction = function(scope, element, attributes) {
        var paragraph = element.children()[0];
        // use a bit of jquery to change colour to red
        $(paragraph).on("click", function() {
            $(this).css({ "background-color": "red" });

        });
    };

    return {
        restrict: "E",
        link: linkFunction
    };
});

// directive repeats contents within.
appRoot.directive("repeatWidget", function() {

    return {
        restrict: "E",
        compile: function(tElement, attrs) {
            var content = tElement.children();
            for (var i = 1; i < attrs.repeat; i++) {
                tElement.append(content.clone());
            }
        }
    }

});
