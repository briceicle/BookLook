'use strict';

/* Controllers */

function PhoneListCtrl($scope, Phone) {
  $scope.phones = Phone.query();
  $scope.orderProp = 'age';
}

PhoneListCtrl.$inject = ['$scope', 'Phone'];



function PhoneDetailCtrl($scope, $routeParams, Phone) {
  $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
    $scope.mainImageUrl = phone.images[0];
  });

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];

function LoginCtrl($scope, ParseService) {
	$scope.login = function() {
		ParseService.login($scope.login_username, $scope.login_password);
	}

	$scope.signUp = function() {
		ParseService.signUp($scope.signup_username, $scope.signup_password);
	}
}
LoginCtrl.$inject = ['$scope', 'ParseService']