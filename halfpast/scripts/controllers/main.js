'use strict';

/**
 * @ngdoc function
 * @name halfpastApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the halfpastApp
 */
angular.module('halfpastAppMain')
    .controller('MainCtrl', ['$scope', function($scope) {

        $scope.test1 = "test";
        $scope.showCategories = false;
        $scope.showContact = false;

    }]);
