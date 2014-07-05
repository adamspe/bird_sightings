'use strict';
var birdSightingsApp = {
    getBaseUrl: function() { return Drupal.settings.birdSightingsApp.basePath; },
    getUserName: function() { return Drupal.settings.birdSightingsApp.user_name; },
    getUserId: function() { return Drupal.settings.birdSightingsApp.user_id; },
    CATEGORIES_VOCABULARY: 'bird_categories',
    SPECIES_VOCABULARY: 'bird_species'
}
angular.module('birdSightingsApp',[
    'birdSightingsApp.filters',
    'birdSightingsApp.services',
    'birdSightingsApp.directives',
    'birdSightingsApp.controllers',
    'ui.bootstrap',
    'ui.bootstrap.carousel',
]).config(['$httpProvider',function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = Drupal.settings.birdSightingsApp.restws_csrf_token;
    $httpProvider.defaults.headers.common['X-ANGULARJS'] = 1;
}]);