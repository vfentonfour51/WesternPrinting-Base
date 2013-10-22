 four51.app.factory('phonegapReady', function () {
	 return function (fn) {
		 var queue = [];

		 var impl = function () {
			 queue.push(Array.prototype.slice.call(arguments));
		 };

		document.addEventListener('deviceready', function () {
			queue.forEach(function (args) {
				 fn.apply(this, args);
		    });
		    impl = fn;
		 }, false);

		 return function () {
		    return impl.apply(this, arguments);
		 };
	 };
 });

four51.app.factory('geolocation', function ($rootScope, phonegapReady) {
	return {
		getCurrentPosition: phonegapReady(function(onSuccess, onError, options) {
			navigator.geolocation.getCurrentPosition(function () {
				var that = this,
				args = arguments;

				if (onSuccess) {
					$rootScope.$apply(function () {
					    onSuccess.apply(that, args);
					});
				}
			}, function () {
				var that = this,
				args = arguments;

				 if (onError) {
				    $rootScope.$apply(function () {
				        onError.apply(that, args);
				    });
				}
			},	 options);
		})
	}
});

four51.app.factory('camera', function($rootScope, phonegapReady) {
	return {
		loadCamera: phonegapReady(function(onSuccess, onError, options) {
			navigator.camera.getPicture(function() {
				var that = this;
				args = arguments;

				if (onSuccess) {
					$rootScope.$apply(function() {
						onSuccess.apply(that, args);
					});
				}
			}, function() {
				var that = this;
				args = arugments;
				if (onError) {
					$rootScope.$apply(function() {
						onError.apply(that, args);
					});
				}
			}, options);
		})
	}
});

 four51.app.factory('notification', function($rootScope, phonegapReady) {
	 return {
		 alert: phonegapReady(function(message, callback, title, name) {
			 navigator.notification.alert(function() {
				 var that = this;
				 args = arguments;

				 if (onSuccess) {
					 $rootScope.$apply(function() {
						 onSuccess.apply(that, args);
					 });
				 }
			 }, function() {
				 var that = this;
				 args = arugments;
				 if (onError) {
					 $rootScope.$apply(function() {
						 onError.apply(that, args);
					 });
				 }
			 }, options);
		 })
	 }
 });

 four51.app.factory('compass', function($rootScope, phonegapReady) {
	 return {
		 watch: phonegapReady(function(onSuccess, onError, options) {
			 navigator.compass.watchHeading(function() {
				 var that = this;
				 args = arguments;

				 if (onSuccess) {
					 $rootScope.$apply(function() {
						 onSuccess.apply(that, args);
					 });
				 }
			 }, function() {
				 var that = this;
				 args = arugments;
				 if (onError) {
					 $rootScope.$apply(function() {
						 onError.apply(that, args);
					 });
				 }
			 }, options);
		 })
	 }
 });
