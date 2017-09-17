'use strict';
angular.module('dietBlog').controller('categoriesCtrl', ['$scope', 'categoryArticles', 'categoryService', 'angularGridInstance', '$state', function($scope, categoryArticles, categoryService, angularGridInstance, $state) {
  $scope.categoryData = categoryArticles.data.tips;
  $scope.currentPage = 1;
  $scope.itemsPerPage = 1;
  $scope.issearch = false;
  $scope.formData = {};
  $scope.noResults = false;
  $scope.totalItems = categoryArticles.data.totalCount;
  var categoryId = categoryArticles.categoryId;
  $scope.paginate = function(categoryId, skip, limit) {
    categoryService.getArticlesByCategory(categoryId, skip, limit).then(function(response) {
      $scope.totalItems = response.data.totalCount;
      $scope.categoryData = response.data.tips;
      if (angularGridInstance.category) {
        angularGridInstance.category.refresh();
      }
    }, function(error) {
      console.log(error);
    });
  };
  $scope.loadBlogDetails = function(pic) {
    $state.go('main.blogDetails', { id: pic.id });
  };
  $scope.pageChangeHandler = function(nmbr) {
    $scope.currentPage = nmbr;
    $scope.paginate(categoryId, ($scope.itemsPerPage * ($scope.currentPage - 1)), $scope.itemsPerPage);
  };

  $scope.getIdForShare = function(getId) {
    $scope.shareUrl = configSettings.baseUrl + 'blogDetails/' + getId.id;
  };
  $scope.search = function() {
    var searchText = $scope.formData.searchString;
    categoryService.categoryArticlesSearch(categoryId, searchText, 0, $scope.itemsPerPage).then(function(response) {
      $scope.categoryData = response.data.tips;
      $scope.totalItems = response.data.totalCount;
      if (angularGridInstance.category) {
        angularGridInstance.category.refresh();
      }

      if ($scope.categoryData.length <= 0) {
        $scope.noResults = true;
      } else {
        angularGridInstance.category.refresh();
      }
    }, function(error) {
      console.log(error);
    });


    $scope.issearch = true;
  };
  $scope.cancel = function() {
    $scope.formData.searchString = '';
    $scope.issearch = false;
    $scope.noResults = false;
    $scope.paginate(categoryId, 0, $scope.itemsPerPage);
  };

}]);
