'use strict';

/* Controllers */

/**
 * Login controller for the app
 */
function LoginCtrl($scope, $location, ParseService) {
	$scope.login = function() {
		ParseService.login($scope.login_username, $scope.login_password, function(user) {
      $location.path('/items');
    });
	}

	$scope.signUp = function() {
		ParseService.signUp($scope.signup_username, $scope.signup_password, function(user) {
      $location.path('/items');
    });
	}
}
LoginCtrl.$inject = ['$scope', '$location', 'ParseService']

/**
 * Main controller for the app
 */
function MainCtrl($scope, $location, ParseService) {
  $scope.init = function() {
    $scope.user = ParseService.getUser();
  };

  //On startup
  $scope.init();
}
MainCtrl.$inject = ['$scope', '$location', 'ParseService']