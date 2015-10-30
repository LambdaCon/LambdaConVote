'use strict';

angular.module('lambdaConApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('proposals', {
        url: '/proposals',
        templateUrl: 'app/proposals/proposals.html',
        controller: 'ProposalsCtrl'
      });
  });