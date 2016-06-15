(function () {
  'use strict';

  angular
    .module('linkar-landing-page')
    .controller('Home', HomeController);

    function HomeController() {

      var vm = this;

      vm.hello = 'Hello Linkar!';

    }
})();
