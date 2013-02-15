'use strict';

/* Services */

angular.module('bookappServices', ['ngResource'])
.factory('ParseService', function($resource){
    // Initialize Parse API and objects.
    Parse.initialize("14NbAp0dn849XjcDuhxo6MAFNv73CA2DQ2e6OV9E", "JFP3EqjW2S0BUOiunPi344o5IbUDH5G4lBaJYxbS");

    // Cache current logged in user
    var loggedInUser;

    // Define parse model and collection for Book records
    var Book = Parse.Object.extend("Book");
    var BookCollection = Parse.Collection.extend({ model:Book});

    // Define parse model and collection for BookRequest records
    var BookRequest = Parse.Object.extend("BookRequest");

    /**
     * ParseService Object
     * This is what is used by the controllers to save and retrieve data from Parse.com.
     * Moving all the Parse.com specific stuff into a service allows me to later swap it out 
     * with another back-end service provider without modifying my controller much, if at all.
     */
    var ParseService = {
      name: "Parse",

      // Login a user
      login : function login(username, password, callback) {
    		Parse.User.logIn(username, password, {
    		  success: function(user) {
            loggedInUser = user;
    		    callback(user);
    		  },
    		  error: function(user, error) {
    		    alert("Error: " + error.message);
    		  }
		    });
      },

      // Register a user
      signUp : function signUp(username, password, callback) {
      	Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
            success: function(user) {
                loggedInUser = user;
                callback(user);
            },

            error: function(user, error) {
              alert("Error: " + error.message);
            }
        });
      },

      // Get all public books
      getBooks : function getBooks(callback) {
        // Create a new Parse Query to search Book records by visibility
        var query = new Parse.Query(Book);
        query.equalTo("visibility", "public");
        query.notEqualTo("owner", loggedInUser.get('username'));
        query.descending("requestCount");
        // use the find method to retrieve all public books
        query.find({
          success : function(results) {
            callback(results);
          },
          error: function(error) {
            alert("Error: " + error.message);
          }
        });
      },

      // Get all books belonging to logged in user
      getMyBooks : function getBooks(callback) {
        // Create a new Parse Query to search Book records by ownerid
        var query = new Parse.Query(Book);
        query.equalTo("owner", loggedInUser.get('username'));
        // use the find method to retrieve all books
        query.find({
          success : function(results) {
            callback(results);
          },
          error: function(error) {
            alert("Error: " + error.message);
          }
        });
      },

      // Creates a borrow request for the given book
      borrow : function borrow(book, callback) {
        // Create and save a request
        var testObject = new BookRequest();
        testObject.save({book: book.get('name'), borrower:loggedInUser.get('username'), status:"Pending", date_borrowed:null, date_returned:null}, {
          success: function(object) {
            // on success, increment the request count for the book
            book.increment("requestCount");
            book.save();
            callback();
          }
        });
      },

      // Get current logged in user
      getUser : function getUser() {
        if(loggedInUser) {
          return loggedInUser;
        }
      }
    
    };

    // The factory function returns ParseService, which is injected into controllers.
    return ParseService;
});
