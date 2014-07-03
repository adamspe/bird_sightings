'use strict';
angular.module('birdSightingsApp.services', ['ngResource']
).factory('Node', ['$resource',
    function($resource){
        console.debug("new Node resource");
        return $resource(birdSightingsApp.getBaseUrl()+'node/:nid', {}, {
          update: { method: 'PUT' }
        });
}]).factory('Nodes', ['$resource',
    function($resource){
        console.debug("new Nodes resource");
        return $resource(birdSightingsApp.getBaseUrl()+'node.json?type=bird_sighting',{},{
            'query':  {method:'GET', isArray:false}
        });
}]);