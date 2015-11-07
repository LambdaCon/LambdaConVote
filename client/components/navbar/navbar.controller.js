'use strict';

angular.module('lambdaConApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/',
    },{
      'title': 'Proposals',
      'link': '/proposals'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedAsAdmin = function () {
      return Auth.isAdmin() && Auth.isLoggedIn();
    }
    $scope.isLoggedAsUser = function () {
      return (!Auth.isAdmin()) && Auth.isLoggedIn();
    }

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
