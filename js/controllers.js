'use strict';
angular.module('birdSightingsApp.controllers', [
]).controller('SightingsCtrl',['$scope','Nodes',
    function($scope,Nodes){
        console.debug("in SightingsCtrl");
        $scope.foo = 'bar';
        $scope.results = Nodes.query({limit: 10},function(results){
            console.debug('results',JSON.stringify(results));
        });
}]);