'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('bookApp', function() {

  it('should redirect index.html to index.html#/login', function() {
    browser().navigateTo('../../app/index.html');
    expect(browser().location().url()).toBe('/login');
  });

  it('should redirect to public item page after login', function() {
    browser().navigateTo('../../app/index.html');
    input('login_username').enter('jdoe');
    input('login_password').enter('password');
    button('login_btn').click();
    expect(browser().location().url()).toBe('/items');
  });

  it('should redirect to public item page after signup', function() {
    browser().navigateTo('../../app/index.html');
    input('signup_username').enter('username');
    input('signup_password').enter('password');
    button('signup_btn').click();
    expect(browser().location().url()).toBe('/items');
  });

  it('form should be invalid if name is empty', function() {
  	browser().navigateTo('../../app/add-book.html');
 	  input('name').enter('');
	  expect(binding('name')).toEqual('');
 	  expect(binding('myForm.input.$valid')).toEqual('false');
  });

  it('form should be valid if all fields enter', function() {
  	browser().navigateTo('../../app/add-book.html');
 	  input('name').enter('NameOfBook');
	  select('status').option('Available');
	  select('visibility').option('Public');
	  select('location').option('Toronto');
 	  expect(binding('myForm.input.$valid')).toEqual('true');
  });
  
});
