(function () {
  'use strict';

  angular
    .module('linkar-landing-page')
    .factory('User', User);

  User.$inject = ['$resource'];

  function User($resource) {
    return $resource("/linkar/api/users/:id", null, {
      'update': { method:'PUT' }
    });
  }
})();
