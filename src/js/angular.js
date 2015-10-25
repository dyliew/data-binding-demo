"use strict";

var config = require('./config');
var cell = require('./cell');

var appName = 'angularApp';

var angularApp = angular.module(appName, []);

angularApp.controller('mainController', ['$scope', function($scope){
    $scope.horizontal = [];
    $scope.vertical = [];

    $scope.load = function(){
        $scope.clear();

        for (var i = 0; i < config.dimension.y(); i++) {
            var row = new rowViewModel();

            for (var j = 0; j < config.dimension.x(); j++) {
                row.row.push(new cellViewModel($scope));
            }

            $scope.horizontal.push(row);
        }

        for (var j = 0; j < config.dimension.x(); j++) {
            $scope.vertical.push(j);
        }
    };

    $scope.triggerAll = function(){
        $scope.horizontal.forEach(function(row) {
            row.row.forEach(function (cell) {
                cell.trigger();
            })
        })
    };

    $scope.clear = function(){
        $scope.horizontal = [];
        $scope.vertical = [];
    };
}]);

angularApp.directive('ngBgColor', [function(){
    return{
        restrict: 'A',
        scope: {
            isTriggered: '=ngBgColor'
        },
        link: function(scope, element) {
            scope.$watch('isTriggered', function(value){
                element.attr('bgcolor', value ? 'CCFFFF': '');
            }, true)
        }
    }
}]);

angular.bootstrap(document.getElementById('angular'), [appName]);

var rowViewModel = function () {
    this.row = [];
};

var cellViewModel = function ($scope) {
    var self = this;

    self.isTriggered = false;

    self.text = function () {
        return self.isTriggered ? "1" : "0";
    };

    self.trigger = function () {
        setTimeout(function () {
            self.isTriggered = true;
            $scope.$apply();
        }, cell.generateRandomTimeout());
    }
};;