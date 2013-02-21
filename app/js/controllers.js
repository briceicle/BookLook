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

  // Perform user login using Facebook API
  $scope.FB_login = function() {
    ParseService.FB_login(function(user) {
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

  // Fetch the list of public books from the backend service
  $scope.getBooks = function() {
    ParseService.getBooks(function(results) {
      $scope.$apply(function() {
        $scope.bookList = results;
      });
    });
  }

  // Fetch the list books from the backend service
  $scope.getMyBooks = function() {
    ParseService.getMyBooks(function(results) {
      $scope.$apply(function() {
        $scope.myBooks = results;
      })
    });
  }

  // Fetch the list of book requests from the backend service
  $scope.getRequests = function() {
    ParseService.getRequests(function(results) {
      $scope.$apply(function() {
        $scope.requests = results;
      })
    });
  }

  // Navigate to add book form
  $scope.add = function() {
    $location.path('/add');
  }

  // Create a new book request and refresh the book list
  $scope.borrow = function(book) {
    ParseService.borrow(book, function(result) {
      alert("Borrow request sent to owner!");
      $scope.$apply(function() {
        book = result;
      })
    });
  }

  // Accept a book request
  $scope.accept = function(request) {
    ParseService.accept(request, function(result) {
      $scope.$apply(function() {
        request = result;
      })
    });
  }

  // Reject a book request
  $scope.reject = function(request) {
    ParseService.reject(request, function(result) {
      $scope.$apply(function() {
        request = result;
      })
    });
  }

  // Add a new book record to Parse backend service
  $scope.addBook = function() {
    ParseService.addBook($scope.name, $scope.status, $scope.visibility, $scope.location, function() {
      $location.path('/items');
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
  $scope.requests = [];
  $scope.init();
  $scope.getBooks();
  $scope.getMyBooks();
  $scope.getRequests();
}
MainCtrl.$inject = ['$scope', '$location', 'ParseService']