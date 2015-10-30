'use strict';

describe('Controller: ProposalsCtrl', function () {

  // load the controller's module
  beforeEach(module('lambdaConApp'));

  var ProposalsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProposalsCtrl = $controller('ProposalsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
