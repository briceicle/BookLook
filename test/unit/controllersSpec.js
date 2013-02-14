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
      ctrl = $controller(LoginCtrl, {$scope: scope});
  }));

    it('After login should redirect to /items', function() {
        scope.login_username = 'admin';
        scope.login_password = 'password';
        scope.login();
        expect(location.path()).toBe('/items');
    });
  });

  describe('MainCtrl', function(){
    var scope, rootScope, ctrl, location;

    beforeEach(inject(function($location, $rootScope, $controller) {
      location = $location;
      location.path('/items');
      rootScope = $rootScope;
      scope = $rootScope.$new();
      ctrl = $controller(MainCtrl, {$scope: scope});
  }));

    it('Langing page should be /items', function() {
        rootScope.$apply();
        expect(location.path()).toBe('/items');
    });
  });

});
