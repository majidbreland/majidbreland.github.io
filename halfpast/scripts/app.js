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
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .when('/photo', {
                templateUrl: 'views/photo.html',
                controller: 'PhotoCtrl',
                controllerAs: 'photo'
            })
            .when('/people', {
                templateUrl: 'views/people.html',
                controller: 'PhotoCtrl',
                controllerAs: 'photo'
            })
            .when('/places', {
                templateUrl: 'views/places.html',
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
            .when('/press', {
                templateUrl: 'views/press.html',
                controller: 'PressCtrl',
                controllerAs: 'press'
            })
            .otherwise({
                redirectTo: '/'
            })
    });

