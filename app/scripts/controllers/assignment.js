'use strict';

angular.module('myApp')
	.controller('AssignmentCtrl', ['assignmentFactory', '$http', '$scope', '$log', function(assignmentFactory, $http, $scope, $log){
		$scope.hello = 'hello';

		$scope.moment = moment;

		var httpAssignmentsData = assignmentFactory.getAssignments();

		httpAssignmentsData.then(function(response){
			$scope.assignments = response.data;
		}, function(response){
			var error = response.error.status;
			$log.log('An error occurred. Status: ' + error);
		});


	}]);