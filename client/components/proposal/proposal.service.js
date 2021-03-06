angular.module('lambdaConApp')
  .factory('Proposal', function ($resource) {

    return $resource('/api/proposals/:id/:controller', {
      id: '@_id'
    },
    {
      rate: {
        method: 'PUT',
        params: {
          controller:'rate'
        }
      }
	  });
  });
