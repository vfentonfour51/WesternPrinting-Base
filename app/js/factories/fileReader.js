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
		getCurrentPosition: phonegapReady(function (onSuccess, onError, options) {
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
				},
				options);
		})
	};
});


four51.app.factory('fileReader', function($q, $log) {
	var onLoad = function(reader, deferred, scope) {
		return function () {
			scope.$apply(function () {
				deferred.resolve(reader);
			});
		};
	};

	var onError = function (reader, deferred, scope) {
		return function () {
			scope.$apply(function () {
				deferred.reject(reader);
			});
		};
	};

	var onProgress = function(reader, scope) {
		return function (event) {
			scope.$broadcast("fileProgress",
				{
					total: event.total,
					loaded: event.loaded
				});
		};
	};

	var getReader = function(deferred, scope) {
		var reader = new FileReader();
		reader.onload = onLoad(reader, deferred, scope);
		reader.onerror = onError(reader, deferred, scope);
		reader.onprogress = onProgress(reader, scope);
		return reader;
	};

	var readAsDataURL = function (file, scope) {
		var deferred = $q.defer();

		var reader = getReader(deferred, scope);
		reader.readAsDataURL(file);

		return deferred.promise;
	};

	return {
		readAsDataUrl: readAsDataURL
	};
});
