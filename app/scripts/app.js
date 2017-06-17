'use strict';

/**
 * @ngdoc overview
 * @name halfpastApp
 * @description
 * # halfpastApp
 *
 * Main module of the application.
 */
angular
  .module('halfpastApp', [
    // 'ngAnimate',
    // 'ngCookies',
    // 'ngResource',
    'ngRoute',
    // 'ngSanitize',
    // 'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/photo.html',
        controller: 'PhotoCtrl',
        controllerAs: 'photo'
      })
      .when('/photo', {
        templateUrl: 'views/photo.html',
        controller: 'PhotoCtrl',
        controllerAs: 'photo'
      })
      .when('/video', {
        templateUrl: 'views/video.html',
        controller: 'VideoCtrl',
        controllerAs: 'video'
      })
      .when('/graphics', {
        templateUrl: 'views/graphics.html',
        controller: 'GraphicsCtrl',
        controllerAs: 'graphics'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
