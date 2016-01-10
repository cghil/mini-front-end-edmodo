'use strict'

angular.module('myApp')
	.factory('assignmentFactory', ['$http', 'myConfig', '$location', function($http, myConfig, $location){
		var service = {};

		service.getAssignments = function(assignmentId, creatorId, token){
			return $http({
				method: 'GET',
				url: myConfig.backend + '/assignments?access_token=' + myConfig.token,
				headers: {'Content-Type': 'application/json'}
			})
		};

		return service;

	}]);