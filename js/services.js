'use strict';
angular.module('birdSightingsApp.services', ['ngResource']
).factory('Node', ['$resource',
    function($resource){
        return $resource(birdSightingsApp.getBaseUrl()+'node/:nid', {}, {
          update: { method: 'PUT' }
        });
}]).factory('Nodes', ['$resource',
    function($resource){
        return $resource(birdSightingsApp.getBaseUrl()+'node.json?type=bird_sighting',{},{
            'query':  {method:'GET', isArray:false}
        });
}]).factory('TaxonomyVocabulary',['$resource',
    function($resource){
        return $resource(birdSightingsApp.getBaseUrl()+'taxonomy_vocabulary.json',{},{
            'query':  {method:'GET', isArray:false}
        });
}]).factory('TaxonomyTerm',['$resource',
    function($resource){
        return $resource(birdSightingsApp.getBaseUrl()+'taxonomy_term.json',{},{
            'query':  {method:'GET', isArray:false}
        });
}])
/**
 * CacheService
 * Supports a generic place where code can put data that shouldn't be fetched from the
 * server repeatedly, default time to live on data is 5 minutes.
 */
.factory('CacheService',function(){
    var expirys = [];
    var cache = [];
    var service = {
      put : function(key,obj) {
        if ( key == null ) {
          return;
        }
        if ( obj == null ) {
          console.debug ( "removing cached object " + key );
          // probably should slice to shrink cache array but...
          cache[key] = null;
          return;
        }
        var ttl = (arguments.length > 2) ?
          arguments[2] :
          (5*60000); // default ttl is 5 minutes
        var expiry = (ttl < 0) ?
          -1 : // never expires
          (new Date()).getTime()+ttl;
        console.debug ( "caching (expiry:"+expiry+") "+key+"="+obj );
        cache[key] = {
          data: obj,
          expiry : expiry

        };
      },
      get : function(key) {
        var obj = cache[key];
        if ( obj == null ) {
          return arguments.length > 1 ? arguments[1] : null;;
        }
        if ( obj.expiry < 0 || obj.expiry > (new Date()).getTime() ) {
          console.debug ( "cache entry " + key + " is valid returning." );
          return obj.data;
        }
        console.debug ( "cache entry " + key + " has expired." );
        // probably should slice to shrink cache array but...
        cache[key] = null;
        return arguments.length > 1 ? arguments[1] : null;;
      }
    };
    return service;
})
/**
 * Derefrences objects from a given Node and uses the cache
 * to avoid exra trips
 */
.factory('ObjectService',['Node','CacheService','$http',
    function(Node,CacheService,$http) {
        var service = {
            getNodeObject : function(file,callback) {
                var uri = file && file.file ? file.file.uri : null,
                    result;
                if(uri && !(result = CacheService.get(uri))) {
                    $http.get(file.file.uri+'.json',{
                    }).then(function(f){
                        if(f.data) {
                            CacheService.put(uri,f.data);
                            callback(f.data);
                        }
                    });
                } else if (result) {
                    callback(result);
                }
            },
            getNodeObjects: function(node,key,callback,first) {
                var array = node && node[key] && angular.isArray(node[key]);
                if(node && node[key]) {
                    if(first || !array) {
                        service.getNodeObject(array?node[key][0]:node[key],callback);
                    } else {
                        angular.forEach(node[key],function(file){
                            service.getNodeObject(file,callback);
                        });
                    }
                }
            },
            getNodeImages: function(node,callback,first) {
                return service.getNodeObjects(node,'field_bs_picture',callback,first);
            }
        };
        return service;
}]).factory('TaxonomyService',['TaxonomyVocabulary','TaxonomyTerm','CacheService',
    function(TaxonomyVocabulary,TaxonomyTerm,CacheService) {
        var service = {
            /* regardless of permissions on the taxonomy_vocabulary/term resources
             * non-admin resources receive a 403 (forbidden) when touching it
             * so the server is providing this info...  aaargh...
            getVocabulary: function(vocabularyName,callback) {
                var cacheKey = 'vocabulary_'+vocabularyName,
                    vocabulary = CacheService.get(cacheKey);
                if(vocabulary) {
                    callback(vocabulary);
                } else {
                    TaxonomyVocabulary.query({machine_name:vocabularyName},function(vocabulary){
                        CacheService.put(cacheKey,vocabulary.list[0]);
                        callback(vocabulary.list[0]);
                    });
                }
            },
            getVocabularyTerms: function(vocabularyName,callback) {
                var cacheKey = 'vocabulary_terms_'+vocabularyName,
                    terms = CacheService.get(cacheKey);
                if(terms) {
                    callback(terms);
                } else {
                    service.getVocabulary(vocabularyName,function(vocab){
                        TaxonomyTerm.query({vocabulary:vocab.vid},function(terms) {
                            CacheService.put(cacheKey,terms.list);
                            callback(terms.list);
                        });
                    });
                }
            },
            getVocabularyTermById: function(vocabularyName,tid,callback) {
                service.getVocabularyTerms(vocabularyName,function(terms) {
                    if(terms && terms.length) {
                        for(var i = 0; i < terms.length; i++) {
                            if(terms[i].tid == tid) {
                                callback(terms[i].name);
                                return;
                            }
                        }
                        callback("Unknown");
                    }
                });
            },
            */
            // since the server has to provide the data these are just synchronous
            getVocabularyTerms: function(vocabularyName) {
                return Drupal.settings.birdSightingsApp[vocabularyName]
            },
            getVocabularyTermById: function(vocabularyName,tid) {
                var vocabulary = service.getVocabularyTerms(vocabularyName);
                return vocabulary ? vocabulary[tid] : "Unknown";
            }
        };
        return service;
    }
]);