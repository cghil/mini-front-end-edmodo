'use strict'

angular.module('myApp')
	.factory('submissionFactory', ['$http', 'myConfig', '$location', function($http, myConfig, $location){
		var service = {};

		service.getSubmissions = function(assignmentId, assignmentCreatorId){
			return $http({
				method: 'GET',
				url: myConfig.backend + '/assignment_submissions?assignment_id=' + assignmentId + '&assignment_creator_id=' + assignmentCreatorId + '&access_token=' + myConfig.token,
				headers: {'Content-Type': 'application/json'}
			})
		};

		service.submissions = null;

		return service;

	}]);