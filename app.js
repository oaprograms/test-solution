// main js file
(function () {
    'use strict';

    // initialize module
    angular
        .module('app', ['ngRoute', 'ui.bootstrap'])
        .config(config)
        .run(run);

    // configure module
    config.$inject = ['$routeProvider', '$qProvider'];
    function config($routeProvider, $qProvider) {
        // prevent unhandled promise errors (incompatible with ui bootstrap)
        $qProvider.errorOnUnhandledRejections(false);

        // configure routes
        $routeProvider

            // homepage (tasks list)
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            // task details
            .when('/task/:id', {
                controller: 'TaskController',
                templateUrl: 'task/task.view.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/' });
    }

    // initial config
    run.$inject = ['$http'];
    function run($http) {
        // configure $http, hardcode user token into all requests
        $http.defaults.headers.common['X-SBG-Auth-Token'] = '9837ee505f214c1ca877a014efd538ce';
    }

})();
