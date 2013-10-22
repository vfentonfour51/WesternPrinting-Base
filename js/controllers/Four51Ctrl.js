four51.app.controller('Four51Ctrl', function ($scope, $routeParams, $location, $cookies, $451, User, Order, Security, OrderConfig, Category, geolocation, camera, notification, compass, phonegapReady) {
    $scope.scroll = 0;
    $scope.appname = $451.appname;
	$scope.Four51User = Security;

    // http://stackoverflow.com/questions/12592472/how-to-highlight-a-current-menu-item-in-angularjs
    $scope.getClass = function(path) {
        var cur_path = $location.path().substr(0, path.length);
        if (cur_path == path) {
            if($location.path().substr(0).length > 1 && path.length == 1 )
                return "";
            else
                return "active";
        } else {
            return "";
        }
    };

    function init() {
        if (Security.isAuthenticated()) {
            User.get(function(user) {
                $scope.user = user;
                if (user.CurrentOrderID) {
                    Order.get(user.CurrentOrderID, function(ordr) {
                        $scope.currentOrder = ordr;
                        OrderConfig.costcenter(ordr, user);
                    });
                }
                else
                    $scope.currentOrder = null;
            });
            Category.tree(function(data) {
                $scope.tree = data;
            });
        }
    }

    function cleanup() {
        Security.clear();
    }

    $scope.$on('event:auth-loginConfirmed', init);
	$scope.$on("$routeChangeSuccess", init);
	$scope.$on('event:auth-loginRequired', cleanup);

	$scope.msg = "Connecting to device...";
	$scope.api = $451.api('');
	
	geolocation.getCurrentPosition(
		function(position) {
			$scope.msg = position.coords.latitude + '<br />' + position.coords.longitude;
		},
		function(error) {
			$scope.msg = 'error code: ' + error.code + '<br />message: ' + error.message;
		}
	);

	$scope.getPic = function() {
		$scope.msg = 'Should launch camera';
		camera.loadCamera(
			function(image) {
				$scope.taken = image;
			},
			function(error) {
				$scope.msg = 'camera error ' + error.code + '<br />message: ' + error.message;
			},
			{}
		);
	};

	//$scope.alert = function() {
	//	$scope.msg = 'Trying an alert';
	//	notification.alert('Owen is a douchebag', function() {
	//		$scope.msg = 'The alert was shown';
	//	}, "Is Owen a douchebag?", "Yes");
	//};

	//compass.watch(
	//	function(heading) {
	//		$scope.msg = heading.magneticHeading;
	//	},
	//	function(error) {
	//		$scope.msg = error.message;
	//	},
	//	{ frequency: 3000 }
	//);

});

