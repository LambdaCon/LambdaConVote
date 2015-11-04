'use strict';

angular.module('lambdaConApp')
  .controller('ProposalsCtrl', function ($scope, Auth) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.createProposal = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Proposal.create({
          title: $scope.proposal.title,
          description: $scope.proposal.description
        })
        .then( function() {
          // Account created, redirect to home
          console.log("OK!!!!");
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };


  });
