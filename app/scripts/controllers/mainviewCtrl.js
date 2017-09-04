'use strict';
angular.module('dietBlog')
  .controller('mainviewCtrl', ['$scope', 'mainviewData', '$window','mainViewService', function($scope, mainviewData, $window, mainViewService) {
    console.log("main sfsd");
    $scope.mainviewData = mainviewData;
    $scope.recentPosts=[];
    $scope.toggleMenu = function() {
      $scope.mainviewData.menuOpen = !$scope.mainviewData.menuOpen;
    };
    mainViewService.recentPosts().then(function(response){
    	$scope.recentPosts=response.data;
    },function(error){
    	console.log(error);
    });
    mainViewService.categories().then(function(response){
    	$scope.categories=response.data;
    },function(error){
    	console.log(error);
    });
     mainViewService.coverblog().then(function(response){
    	$scope.coverblog=response.data.tips[0];
    	$scope.backgroundimg=
    		{
    			background:'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('+response.data.tips[0].images[0]+') fixed center center'
};
    },function(error){
    	console.log(error);
    });
    
    angular.element($window).bind("scroll", function() {
      if (this.pageYOffset > 250) {
        if (!$scope.mainviewData.scrollview) {
          $scope.mainviewData.scrollview = true;
          if(this.innerWidth>767){
          	$scope.mainviewData.headerview=true;
          }
          $scope.$apply();
        }
      } else {
        if ($scope.mainviewData.scrollview) {
          $scope.mainviewData.scrollview = false;
          if(this.innerWidth>767){
          	$scope.mainviewData.headerview=false;
          }
          $scope.$apply();
        }
      }
    });

    $scope.scrolltoTop = function() {
      $('body,html').animate({
        scrollTop: 0,
      }, 700);
    };

    $scope.mobmenutoggle=function(){
    	if($('.categ').is(':visible')){
    		$('.categ').slideUp();
    	}else{
    	  $('.categ').slideDown();
    	}
    };

    $scope.usersubscribe=function(email){
    	if($scope.usersubscrip !== ""){
    		mainViewService.subscribe(email).then(function(response){
    			console.log(response);
    		},function(msg){
    			console.log(msg);
    		});
    	}else{
    		alert("enter valid email");
    	}
    };
    
  }]);