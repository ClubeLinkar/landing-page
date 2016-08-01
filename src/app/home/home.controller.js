(function () {
  'use strict';

  angular
    .module('linkar-landing-page')
    .controller('Home', HomeController);

  function HomeController(User, ngToast, $stateParams) {

    var vm = this;

    vm.init = init;
    vm.save = save;

    vm.init();

    function init() {
      vm.user = {};
      vm.signupSuccess = false;
    }

    function save() {

      var hasErrors;

      if (!vm.user.name) {
        hasErrors = true;
        ngToast.danger("Por favor, diga-nos o seu nome.");
      }

      if (!vm.user.email) {
        hasErrors = true;
        ngToast.danger("Por favor, preencha o campo e-mail com um e-mail válido.");
      }

      if (!vm.user.cpf) {
        hasErrors = true;
        ngToast.danger("Por favor, preencha o campo CPF com um número válido.");
      }

      if (!vm.user.password) {
        hasErrors = true;
        ngToast.danger("Por favor, escolha sua senha. Ela será utilizada para sua autenticação no sistema.");
      }

      if ($stateParams.identifier) {
          vm.user.referer = $stateParams.identifier;
      }

      if (!hasErrors) {
        User.save(vm.user, function(data) {
          ngToast.create('Seu usuário foi criado com sucesso, ' + vm.user.name + '. Você já pode Linkar!');
          vm.signupSuccess = true;
        },
        function(erro) {
          console.log(erro);
          ngToast.danger("Houve um erro de validação dos dados. " + erro.data.exception);
        });
      }
    }

  }
})();
