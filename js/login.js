angular
  .module("Agency", ["ui.bootstrap"])
  .controller("LoginController", [
    "$scope",
    "$uibModal",
    function ($scope, $uibModal) {
      $scope.openLoginPopup = function () {
        var modalInstance = $uibModal.open({
          templateUrl: "./views/login-template.html",
          controller: "LoginModalController",
          // backdrop: 'static', // Prevent closing on outside click
          keyboard: false, // Prevent closing on Esc key
        });
      };
    },
  ])
  .controller("LoginModalController", [
    "$scope",
    "$uibModalInstance",
    function ($scope, $uibModalInstance) {
      $scope.password = "";

      $scope.login = function () {
        // Perform login logic here
        // Access username and password from $scope.username and $scope.password respectively

        // Close the popup
        $uibModalInstance.close();
      };

      $scope.cancel = function () {
        // Close the popup without performing any action
        $uibModalInstance.dismiss("cancel");
      };
    },
  ]);
