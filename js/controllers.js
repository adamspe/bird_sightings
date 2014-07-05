'use strict';
angular.module('birdSightingsApp.controllers', [
])
.run(['$rootScope',function($rootScope){
    $rootScope.userName = birdSightingsApp.getUserName();
}])
.controller('SightingsCtrl',['$scope','Nodes','ObjectService','TaxonomyService',
    function($scope,Nodes,ObjectService,TaxonomyService){
        $scope.carousel = {
            mine: false,
            minePopover: 'Show Just My Sightings',
            queryParams: {limit: 10, sort: 'created', direction: 'DESC'},
            interval: 5000,
        };
        $scope.justMine = function() {
            $scope.carousel.mine = !$scope.carousel.mine;
            $scope.carousel.minePopover = $scope.carousel.mine ? "Show Everyone's Sightings" : 'Show Just My Sightings';
            $scope.carousel.queryParams.author = $scope.carousel.mine ? birdSightingsApp.getUserId() : null;
            $scope.reload();
        }
        $scope.reload = function() {
            $scope.results = Nodes.query($scope.carousel.queryParams,function(results){
                $scope.sightings = [];
                angular.forEach(results.list,function(sighting){
                    ObjectService.getNodeImages(sighting,function(image){
                        // only put sightings with at least one image in the carousel
                        if(image && image.url) {
                            console.debug("sighting:",sighting.title+"/"+image.url)
                            sighting.imageObj = image;
                            sighting.image = image.url;
                            sighting.species = TaxonomyService.getVocabularyTermById(birdSightingsApp.SPECIES_VOCABULARY,sighting.field_bs_species.id);
                            sighting.category = TaxonomyService.getVocabularyTermById(birdSightingsApp.CATEGORIES_VOCABULARY,sighting.field_bs_grouping.id);
                            $scope.sightings.push(sighting);
                        }
                    },true/*just the first image*/);
                });
            });
        }
        $scope.reload();
}]);