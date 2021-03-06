'use strict';
angular.module('dietBlog')
  .controller('blogCtrl', function($scope, $state, blogService, angularGridInstance, configSettings, gridData) {
    $scope.awesomeThings = [];

    $scope.pagination = {
      currentPage: 1
    };

    $scope.itemsPerPage = configSettings.itemsPerPage;
    $scope.totalItems = 0;
    $scope.issearch = false;
    $scope.formData = {};
    $scope.noResults = false;
    if (gridData) {
      $scope.pagination.currentPage = gridData.currentPage;
      $scope.totalItems = gridData.totalCount;
      $scope.awesomeThings = gridData.tips;
      if (angularGridInstance.gallery) {
        angularGridInstance.gallery.refresh();
      }
      if ($state.params.page !== gridData.currentPage) {
        $state.go('main.blog', { page: gridData.currentPage });
      }
    }
    $scope.paginate = function(limit, skip) {
      blogService.getBlogs(limit, skip).then(function(response) {
        $scope.totalItems = response.totalCount;
        $scope.awesomeThings = response.tips;
        if (angularGridInstance.gallery) {
          angularGridInstance.gallery.refresh();
        }
      }, function(error) {
        console.log(error);
      });
    };
    $scope.loadBlogDetails = function(pic) {
      $state.go('main.blogDetails', { id: pic.id });
    };
    $scope.pageChangeHandler = function(nmbr) {
      // $scope.currentPage = nmbr;
      /*  if ($scope.issearch) {
          $scope.search('', $scope.itemsPerPage, ($scope.itemsPerPage * ($scope.pagination.currentPage - 1)), null);
        } else {*/

      $state.go('main.blog', { page: nmbr });
      $scope.paginate($scope.itemsPerPage, ($scope.itemsPerPage * ($scope.pagination.currentPage - 1)));
      /* }*/

      $("html, body").animate({ scrollTop: $('#gridcontainer').offset().top - 50 }, 500);
    };

    $scope.getIdForShare = function(getId) {
      $scope.shareUrl = configSettings.baseUrl + 'blogDetails/' + getId.id;
    };
    /* $scope.search = function($event, limit, skip,fromUser) {
       console.log($event);
       if($event.keyCode ==13 || fromUser== null){
           var searchText = $scope.formData.searchString;
           var pageLimit = limit >= 0 ? limit : 3;
           var pageSkip = skip >= 0 ? skip : 0;
       // if (pageSkip == 0) {
         // $scope.currentPage = 1;
       // }
           if(fromUser){
             if($scope.pagination.currentPage == 1){
                 blogService.articlesSearch(searchText, pageLimit, pageSkip).then(function(response) {
                 $scope.awesomeThings = response.tips;
                 $scope.totalItems = response.totalCount;
                 if (angularGridInstance.gallery) {
                   angularGridInstance.gallery.refresh();
                 }

                 if ($scope.awesomeThings.length <= 0) {
                   $scope.noResults = true;
                 } else {
                   angularGridInstance.gallery.refresh();
                 }
               }, function(error) {
                 console.log(error);
               });
             }else{
               $scope.pagination.currentPage=1;
             }
             
           }else{
             blogService.articlesSearch(searchText, pageLimit, pageSkip).then(function(response) {
                 $scope.awesomeThings = response.tips;
                 $scope.totalItems = response.totalCount;
                 if (angularGridInstance.gallery) {
                   angularGridInstance.gallery.refresh();
                 }

                 if ($scope.awesomeThings.length <= 0) {
                   $scope.noResults = true;
                 } else {
                   angularGridInstance.gallery.refresh();
                 }
               }, function(error) {
                 console.log(error);
               });
           }
           $scope.issearch = true;
       }
       
     };
     $scope.cancel = function() {
       $scope.formData.searchString = '';
       $scope.issearch = false;
       $scope.noResults = false;
       if($scope.pagination.currentPage==1){
        $scope.paginate($scope.itemsPerPage, 0);
       }else{
       $scope.pagination.currentPage=1;
       }
     };*/

  });
