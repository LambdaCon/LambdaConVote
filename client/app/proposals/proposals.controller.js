'use strict';

angular.module('lambdaConApp')
  .controller('ProposalsCtrl', function ($scope, $http, Auth, Proposal, socket) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.proposals = [];
    $scope.alreadyRated = function (proposal) {
      // console.log("already", proposal);
      return proposal.ratings.some(function (p) {
        console.log("some:", p.userId === Auth.getCurrentUser()._id, p.userId, Auth.getCurrentUser()._id);
        return p.userId === Auth.getCurrentUser()._id;
      });
    };

    $scope.rateAt = function (proposal, rate) {
      console.log("rate at: ", rate, proposal);
      $http.put('/api/proposals/' + proposal._id + "/rate", { rate: rate, userId: Auth.getCurrentUser()._id })
      .success(function(res) {
        console.log("res: ", res);
      });
    };

    $http.get('/api/proposals').success(function(proposals) {
      console.log(proposals);
      $scope.proposals = proposals;
      socket.syncUpdates('proposal', $scope.proposals);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('proposal');
    });

    $scope.delete = function (proposal) {
      $http.delete('/api/proposals/' + proposal._id)
    };

    $scope.createProposal = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Proposal.save({
          title: $scope.proposal.title,
          description: $scope.proposal.description
        }).$promise
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
