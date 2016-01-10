'use strict';


 // * Main module of the application.

angular
  .module('myApp', [
    'ENV.development',
    'ngCookies',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/assignments', {
        templateUrl: 'views/assignments.html',
        controller: 'AssignmentCtrl'
      })
      .when('/assignments/:id', {
        templateUrl: 'views/assignments.html',
        controller: 'AssignmentCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular.module('ENV.development', [])
  .constant('myConfig', {
    backend: 'https://api.edmodo.com',
    token: '12e7eaf1625004b7341b6d681fa3a7c1c551b5300cf7f7f3a02010e99c84695d'
  });