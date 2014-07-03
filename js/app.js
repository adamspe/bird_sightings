'use strict';
var birdSightingsApp = {
    getBaseUrl: function() { return Drupal.settings.birdSightingsApp.basePath; }
}
angular.module('birdSightingsApp',[
    'birdSightingsApp.filters',
    'birdSightingsApp.services',
    'birdSightingsApp.directives',
    'birdSightingsApp.controllers'
]).config(['$httpProvider',function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = Drupal.settings.birdSightingsApp.restws_csrf_token;
    $httpProvider.defaults.headers.common['X-ANGULARJS'] = 1;
}]);