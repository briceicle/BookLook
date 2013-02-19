'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('bookApp', function() {

  it('should redirect index.html to index.html#/login', function() {
    browser().navigateTo('../../app/index.html');
    expect(browser().location().url()).toBe('/login');
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
