'use strict';

/* Controllers */

/**
 * Login controller for the app
 */
function LoginCtrl($scope, $location, ParseService) {
  // Perform user login using back-end service
	$scope.login = function() {
		ParseService.login($scope.login_username, $scope.login_password, function(user) {
      // When service call is finished, navigate to items page
      $location.path('/items');
    });
	}

  // Perform user signup using back-end service
	$scope.signUp = function() {
		ParseService.signUp($scope.signup_username, $scope.signup_password, function(user) {
      // When service call is finished, navigate to items page
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
  }

  // Fetch the list of public books from the back-end service
  $scope.getBooks = function() {
    ParseService.getBooks(function(results) {
      $scope.$apply(function() {
        $scope.bookList = results;
      });
    });
  }

  // Fetch the list books from the back-end service
  $scope.getMyBooks = function() {
    ParseService.getMyBooks(function(results) {
      $scope.$apply(function() {
        $scope.myBooks = results;
      })
    });
  }

  $scope.addBook = function() {

  }

  // Create a new book request and refresh the book list
  $scope.borrow = function(book) {
    ParseService.borrow(book, function() {
      // refresh book list
      alert("Borrow request sent to owner!");
    });
  }

  // logs the user out and re-direct to login page
  $scope.logout = function() {
    ParseService.logout();
    $location.path('/login');
  }

  /**
   * On startup...
   */
  $scope.bookList = [];
  $scope.myBooks = [];
  $scope.init();
  $scope.getBooks();
  $scope.getMyBooks();
}
MainCtrl.$inject = ['$scope', '$location', 'ParseService']