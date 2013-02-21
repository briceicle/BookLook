'use strict';

/* jasmine specs for controllers go here */
describe('bookapp controllers', function() {

  document.write("<script src='http://www.parsecdn.com/js/parse-1.2.0.min.js' type='text/javascript'></script>");

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });


  beforeEach(module('bookappServices'));


  describe('LoginCtrl', function(){
    var scope, rootScope, ctrl, location;

    beforeEach(inject(function($location, $rootScope, $controller) {
      location = $location;
      rootScope = $rootScope;
      scope = $rootScope.$new();
      scope.login_username = 'jdoe';
      scope.login_password = 'password';
      ctrl = $controller(LoginCtrl, {$scope: scope});
    }));

    it('After login should redirect to /items', function() {
        expect(location.path()).toBe('');
        scope.login();
        expect(location.path()).toBe('/items');
    });
  });

  describe('MainCtrl', function(){
    var scope, rootScope, ctrl, location, User, currentUser;

    beforeEach(inject(function($location, $rootScope, $controller, ParseService) {
      User = Parse.Object.extend("User");
      currentUser = new User();
      currentUser.set("username", "jdoe");
      ParseService.loggedInUser = currentUser;
      location = $location;
      rootScope = $rootScope;
      scope = $rootScope.$new();
      ctrl = $controller(MainCtrl, {$scope: scope, $location: location,  ParseService: ParseService});
    }));

    it('List of public books should be 3', function() {
      scope.getBooks();
      expect(scope.bookList.length).toBe(3);
    });

    it('List of user books should be 2', function() {
      scope.getMyBooks();
      expect(scope.bookList.length).toBe(2);
    });

    it('Should increment request count when borrowing', function() {
      var Book = Parse.Object.extend("Book");
      var book = new Book();
      book.set("name", "Twilight");
      book.set("requestCount", 0);
      scope.borrow(book);
      expect(book.get("requestCount")).toBe(1);
    });

    it('Should redirect to add form', function() {
      scope.add();
      expect(location.path()).toBe('/add');
    });

    it('Should update request status when accepting', function() {
      var Request = Parse.Object.extend("BookRequest");
      var request = new Request();
      book.set("book", "Twilight");
      book.set("status", "Pending");
      scope.accept(request);
      expect(request.get("status")).toBe("Accepted");
    });

    it('Should update request status when rejecting', function() {
      var Request = Parse.Object.extend("BookRequest");
      var request = new Request();
      book.set("book", "Twilight");
      book.set("status", "Pending");
      scope.reject(request);
      expect(request.get("status")).toBe("Rejected");
    });
  });

});
