'use strict';
angular.module('birdSightingsApp.controllers', [
])
.run(['$rootScope',function($rootScope){
    $rootScope.userName = birdSightingsApp.getUserName();
}])
/**
 * Menu controller (nothing to control at the moment).
 */
.controller('MenuCtrl',['$scope',function($scope){

}])
/**
 * Simple controller for the sightings carousel view, fetches the
 * most recent 20 (max) sightings with images.
 */
.controller('SightingsCtrl',['$scope','Nodes','ObjectService','TaxonomyService',
    function($scope,Nodes,ObjectService,TaxonomyService){
        $scope.carousel = {
            mine: false,
            minePopover: 'Show Just My Sightings',
            queryParams: {limit: 20, sort: 'created', direction: 'DESC'},
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
}])
/**
 * Simple controller for the map view. 
 */
.controller('MapCtrl',['$scope','$http','TaxonomyService','$filter',
    function($scope,$http,TaxonomyService,$filter) {
        var species = TaxonomyService.getVocabularyTerms(birdSightingsApp.SPECIES_VOCABULARY),
            id;
        $scope.httpConfig = {params: {species_ids: undefined, days: 30}};
        $scope.species = {'All' : undefined};
        for(id in species) {
            $scope.species[species[id]] = id;
        }
        $scope.reloadMapData = function() {
            $http.get('bird-sightings/map-data',$scope.httpConfig).success(function(sightings){
                if($scope.markerClusterer) {
                    $scope.markerClusterer.clearMarkers();
                } else {
                    $scope.markerClusterer = new MarkerClusterer($scope.map,[]);
                }
                var markers = [];
                angular.forEach(sightings,function(sighting){
                    markers.push(new google.maps.Marker({
                        position: new google.maps.LatLng(sighting.lat,sighting.lng),
                        icon: 'https://dl.dropboxusercontent.com/u/80257913/ab-icon.png',
                        title: sighting.title+' ('+
                               TaxonomyService.getVocabularyTermById(birdSightingsApp.SPECIES_VOCABULARY,sighting.species_id)+") ["+
                               TaxonomyService.getVocabularyTermById(birdSightingsApp.CATEGORIES_VOCABULARY,sighting.category_id)+"] "+
                               $filter('date')((sighting.created*1000),'medium')
                    }));
                });
                $scope.markerClusterer.addMarkers(markers);
            });
        }
        $scope.map = new google.maps.Map(document.getElementById('clusterMap'), {
          zoom: 4,
          center: new google.maps.LatLng(38.8402805, -97.61142369999999),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        $scope.reloadMapData();
}]);