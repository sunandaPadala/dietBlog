'use strict';
angular.module('dietBlog').service('mainViewService', ['$q', '$http', 'configSettings', function($q, $http, configSettings) {
  this.recentPosts = function() {

    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'articles/list/recent';
    $http.get(requrl)
      .then(function(data) {
        deferred.resolve(data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };
  this.categories = function() {

    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'category/list/all';
    $http.get(requrl)
      .then(function(data) {
        deferred.resolve(data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };
  this.subscribe = function(email) {

    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'user/subscribe/app';
    var data = {};
    data['email'] = email;
    $http.post(requrl, data)
      .then(function(data) {
        deferred.resolve(data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };

  this.coverblog = function() {

    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'article/get/cover/blog';
    $http.get(requrl)
      .then(function(data) {
        deferred.resolve(data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };
  this.getArticlesByCategory = function(categoryId) {
    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'articles/' + categoryId + '/articlesAll';
    $http.get(requrl)
      .then(function(data) {
        deferred.resolve(data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  };
  this.bookAnAppointment = function(dataObj) {
    var deferred = $q.defer();
    var requrl = configSettings.baseUrl + 'user/send/dietinfo/admin';
    $http.post(requrl, dataObj)
      .then(function(data) {
        deferred.resolve(data);
      }, function(msg, code) {
        deferred.reject(msg);
      });
    return deferred.promise;
  }

}]);
