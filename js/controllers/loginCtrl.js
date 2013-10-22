'use strict';

four51.app.controller('LoginCtrl', function LoginCtrl($scope, $route, User) {

	$scope.$on('event:auth-loginFailed', function(event, message) {
		$scope.errorMessage = message;
	});

	$scope.credentials = {};
	$scope.credentials.Username = 'imabuyer';
	$scope.credentials.Password = 'bernie';

	$scope.login = function() {
		$scope.api = "trying login";
		User.login(this.credentials,
			function(user) {
				$scope.api = user.FirstName;
			},
			function(error) {
				$scope.api = 'Error: ' + error.status;
			}
		);
	};
});
