'use strict';

/* Filters */

angular.module('bookappFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
