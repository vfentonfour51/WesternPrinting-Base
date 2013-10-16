'use strict';

four51.app.controller('LoginCtrl', function LoginCtrl($scope, $route, User) {

	$scope.$on('event:auth-loginFailed', function(event, message) {
		$scope.errorMessage = message;
	});

	$scope.login = function() {
		alert(this.credentials.Username);
		User.login(this.credentials);
	};
});
