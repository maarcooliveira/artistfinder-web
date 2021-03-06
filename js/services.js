//var baseUrl = "http://localhost:4000/api";
var baseUrl = "https://sleepy-hamlet-6905.herokuapp.com/api";

angular.module('demoServices', [])
    .factory('Artists', function($http, $window){
        return {
            getTop: function(n, callback){
                $http.get(baseUrl+'/artists?sort={\"favCount\":-1}&limit='+n.toString()).success(function(data){
                    callback(data);
                });
            },
            getRecent: function(n, callback){
                $http.get(baseUrl+'/changelogs?where={\"operation\": \"post\", \"model\": \"artist\"}&sort={\"_id\":-1}&limit='+n.toString()).success(function(data){
                    callback(data);
                });
            },
            getById: function(id, callback){
                $http.get(baseUrl+'/artists/' + id).success(function(data){
                    callback(data);
                });
            },
            update: function(data, callback){
                $http.put(baseUrl+'/artists/' + data._id, $.param(data)).success(function(data){
                    console.log(data);
                    callback();
                })
                .error(function(data) {
                    console.log(data);
                });
                
            },
            delete: function(artistId, callback){
                $http.delete(baseUrl+'/artists/' + artistId).success(function(){
                    callback();
                });
            },
            get: function(callback){
                $http.get(baseUrl+'/artists').success(function(data){
                    callback(data);
                });
            }, 
            post: function(data, callback) {
                $http.post(baseUrl+'/artists', $.param(data)).success(function (data) {
                    callback(data);
                });
            }
        }
    })
    .factory('Users', function($http, $window){
        return{
            getById: function(userID, callback){
                $http.get(baseUrl+'/users/' + userID).success(function(data){
                    callback(data);
                });
            },
            update: function(user, callback){
                console.log("USER: ");
                console.log(user);
                $http.put(baseUrl+'/users/' + user._id, $.param(user)).success(function(data){
                    console.log(data);
                    callback();
                })
                .error(function(data) {
                    console.log(data);
                });
            },
            delete: function(userID, callback){
                $http.delete(baseUrl+'/users/'+userID).success(function(){
                    callback();
                });
            },
            signup: function(user, callback) {
                $http.post(baseUrl+'/signup', $.param(user)).success(function(data){
                    console.log("IS OK");
                    console.log(data);
                    callback(data);
                })
                .error(function(data) {
                    console.log("IS ERROR");
                    console.log(data);
                    callback(data);
                });  
            },
            signin: function(user, callback) {
                $http.post(baseUrl+'/signin', $.param(user)).success(function(data){
                    callback(data);  
                })
                .error(function(data) {
                    callback(data);
                }); 
            }
        }
    })
    .factory('Albums', function($http, $window){
        return{
            getByArtist : function(artistId, callback){
                $http.get(baseUrl+'/albums?where={\"artistId\":\"' + artistId + '\"}').success(function(data){
                    callback(data);
                });
            },
            getById: function(id, callback) {
                $http.get(baseUrl+'/albums/'+id).success(function(data) {
                    callback(data);
                });
            },
            update: function(data, callback){
                $http.put(baseUrl+'/albums/' + data._id, $.param(data)).success(function(){
                    callback();
                });
            },
            delete: function(album, callback){
                $http.delete(baseUrl+'/albums/'+album._id).success(function(){
                    callback();
                });
            },
            post: function(data, callback){
                $http.post(baseUrl+'/albums/', $.param(data)).success(function(data){
                    callback(data);
                });
            }
        }
    })
    .factory('Changelogs', function($http, $window){
        return{
            getCount : function(callback){
                $http.get(baseUrl+'/changelogs').success(function(data){
                    callback(data.data.length);
                });
            },
            getOneDayInfo: function(date, callback){
                $http.get(baseUrl + '/changelogs?where={\"date\":{\"$gte\":\"' + date + '\"}}').success(function(data){
                    callback(data.data);
                });
            }
        }
    })
    ;
