var clockApp = angular.module('clockApp', ['ngRoute']);

    // configure routes
    clockApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'main.html',
                controller  : 'mainController'
            })
            // route for the alarm page
            .when('/alarm', {
                templateUrl : 'views/alarm.html',
                controller  : 'alarmController'
            })
            .when('/stopWatch', {
                templateUrl : 'views/stopWatch.html',
                controller  : 'stopWatchcontroller'
            })
            // route for the timer page
            .when('/timer', {
                templateUrl : 'views/timer.html',
                controller  : 'timerController'
            })
	        .otherwise({
		      	redirectTo: '/'
			});    
    });
