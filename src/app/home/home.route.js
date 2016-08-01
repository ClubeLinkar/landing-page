(function () {
  'use strict';

  angular.module('linkar-landing-page').config(Config);

  function Config($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'app/home/home.html',
      controller: 'Home',
      controllerAs: 'vm'
    })
    .state('share', {
      url: '/share/:identifier',
      templateUrl: 'app/home/home.html',
      controller: 'Home',
      controllerAs: 'vm'
    });
    $urlRouterProvider.otherwise('/');
  }
})();
