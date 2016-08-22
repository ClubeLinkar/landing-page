(function () {
  'use strict';

  angular
    .module('linkar-landing-page')
    .controller('Home', HomeController);

  function HomeController(User, ngToast, $stateParams, $firebaseAuth) {

    var auth = $firebaseAuth();

    var vm = this;

    vm.init = init;
    vm.save = save;
    vm.login = login;

    vm.init();

    function init() {
      vm.user = {};
      vm.signupSuccess = false;
    }

    function save() {

      ngToast.dismiss();

      var hasErrors;

      if (!vm.user.name) {
        hasErrors = true;
        ngToast.danger("Por favor, diga-nos o seu nome.");
      }

      if (!vm.user.email) {
        hasErrors = true;
        ngToast.danger("Por favor, preencha o campo e-mail com um e-mail válido.");
      }

      // if (!vm.user.cpf) {
      //   hasErrors = true;
      //   ngToast.danger("Por favor, preencha o campo CPF com um número válido.");
      // }

      if (!vm.user.password) {
        hasErrors = true;
        ngToast.danger("Por favor, escolha sua senha. Ela será utilizada para sua autenticação no sistema.");
      }

      if (!vm.user.password_retype) {
        hasErrors = true;
        ngToast.danger("Você deve digitar novamente a senha escolhida.");
      }

      if (vm.user.password !== vm.user.password_retype) {
        hasErrors = true;
        ngToast.danger("As senhas digitadas não coincidem.");
      }

      if ($stateParams.identifier) {
          vm.user.referer = $stateParams.identifier;
      }

      if (!hasErrors) {
        saveUser();
      }
    }

    function saveUser() {
      User.save(vm.user, function(data) {
        ngToast.create('Seu usuário foi criado com sucesso, ' + vm.user.name + '. Você já pode Linkar!');
        vm.signupSuccess = true;
      },
      function(erro) {
        console.log(erro);
        ngToast.danger("Houve um erro de validação dos dados. " + erro.data.exception);
      });
    }

    function login(provider) {
      if (provider === 'facebook') {
        auth.$signInWithPopup(provider, {
          remember: "sessionOnly", scope: "email, public_profile, user_friends, user_birthday, user_likes, user_posts"
        }).then(authSuccessful).catch(handleFirebaseAuthError);
      }

      if (provider === 'google') {
        auth.$signInWithPopup(provider).then(authSuccessful).catch(handleFirebaseAuthError);
      }
    }

    function authSuccessful(firebaseUser) {

      vm.user.email = firebaseUser.user.email;
      vm.user.name = firebaseUser.user.displayName;

      vm.user.providers = [];

      firebaseUser.user.providerData.forEach(function(provider) {
        vm.user.providers.push({
          uid: provider.uid,
          email: provider.email,
          displayName: provider.displayName,
          providerId: provider.providerId,
          photoURL: provider.photoURL
        });
      });

      saveUser();

    }

    function handleFirebaseAuthError(error) {
      if (error.credential && error.code === 'auth/account-exists-with-different-credential') {
        auth.$getAuth().link(error.credential).then(function(user) {
          console.log(user);
          authSuccessful(user);
        }, function(error) {
          console.log("Account linking error", error);
        });
      } else {
        console.log("Authentication failed:", error);
      }
    }

  }
})();
