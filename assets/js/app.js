var clockApp = angular.module('clockApp', ['ngRoute']);

    // configure routes
    clockApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'views/main.html',
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

clockApp.directive("swipeable", function($route, $location) {
  return function(scope, element, attrs) {
    var defined_routes = [];
    var current_route = $route.current.$$route.originalPath;
    
    angular.forEach($route.routes, function(config, route) {
      if(config.controller)
        defined_routes.push(route);
    });

    var hammer = new Hammer(element[0]);
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    hammer.on("swipeleft swiperight", function(e) {
      // if event type is swiperight set the direction to 1, otherwise 0
      var direction = e.type === "swipeleft" ? 1 : 0;
      
      if (direction) {
        $location.path(getNextRoute());
        
      } else {
        $location.path(getPrevRoute());
      }
      
      scope.$apply();
    });
    
    function getNextRoute() {
      var current_route_index = defined_routes.indexOf(current_route);
      var next_route = null;
      
      if (current_route_index === defined_routes.length - 1) {
        next_route = current_route;
      } else {
        next_route = defined_routes[current_route_index + 1];
      }
      
      return next_route;
    }
    
    function getPrevRoute() {
      var current_route_index = defined_routes.indexOf(current_route);
      var prev_route = null;
      
      if (current_route_index === 0) {
        prev_route = current_route;
      } else {
        prev_route = defined_routes[current_route_index - 1];
      }
      
      return prev_route;
    }
  };
});