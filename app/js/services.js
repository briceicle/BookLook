'use strict';

/* Services */

angular.module('phonecatServices', ['ngResource'])
.factory('Phone', function($resource){
  return $resource('phones/:phoneId.json', {}, {
    query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
  });
})
.factory('ParseService', function($resource){
    // Initialize Parse API and objects.
    Parse.initialize("14NbAp0dn849XjcDuhxo6MAFNv73CA2DQ2e6OV9E", "JFP3EqjW2S0BUOiunPi344o5IbUDH5G4lBaJYxbS");

    // Define Parse Model and Collection for Signature records (firstName, lastName, email, signature, and petitionId)
    //var Signature = Parse.Object.extend("signature");
    //var SignatureCollection = Parse.Collection.extend({ model: Signature });

    // Define Parse Model and Collection for Petitions. 
    //var Petition = Parse.Object.extend("petition");
    //var PetitionCollection = Parse.Collection.extend({ model: Petition });

    /**
     * ParseService Object
     * This is what is used by the main controller to save and retrieve data from Parse.com.
     * Moving all the Parse.com specific stuff into a service allows me to later swap it out 
     * with another back-end service provider without modifying my controller much, if at all.
     */
    var ParseService = {
      name: "Parse",
      
      // Retrieve all petitions
     /* getPetitions : function getPetitions(callback) {
        // Instantiate a petition collection
        var petitions = new PetitionCollection();

        // Use Parse's fetch method (a modified version of backbone.js fetch) to get all the petitions.
        petitions.fetch({
          success: function (results) {
              // Send the petition collection back to the caller if it is succesfully populated. 
              callback(petitions);
          },
          error: function ( results,error) {
              alert("Collection Error: " + error.message);
          }
        });
      },

      // Save the data from the signature form to Parse.com
      saveSignature : function saveSignature(data, callback){
        var sig = new Signature();
        sig.save( data,
                  {
                    success: function (obj) {
                      callback(obj);
                    },
                    error: function (obj, error) {
                      alert("Error: " + error.message);
                    }
                  }
        );
      },

      // Get signature data for a specified petition
      getSignatures : function getSignatures(petitionId, callback) {
        // Create a new Parse Query object in order to search Signature records by petitionId
        var query = new Parse.Query(Signature);
        query.equalTo("petitionId", petitionId);
        // Use the find method to retreive all signatures with the given petitionId
        query.find({
          success: function (results) {
            callback(results);
          },
          error: function (error) {
            alert("Error: " + error.message);
          }
        });
      }, */

      login : function login(username, password) {
		Parse.User.logIn(username, password, {
		  success: function(user) {
		    alert("User succesfully logged in");
		  },
		  error: function(user, error) {
		    alert("Error: " + error.message);
		  }
		});
      },

      signUp : function signUp(username, password) {
      	Parse.User.signUp(username, password, { ACL: new Parse.ACL() }, {
            success: function(user) {
                alert("User succesfully registered");
            },

            error: function(user, error) {
              alert("Error: " + error.message);
            }
        });
      }
    
    };

    // The factory function returns ParseService, which is injected into controllers.
    return ParseService;
});
