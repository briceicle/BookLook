'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('bookApp', function() {

  it('should redirect index.html to index.html#/login', function() {
    browser().navigateTo('../../app/index.html');
    expect(browser().location().url()).toBe('/login');
  });
  
});
