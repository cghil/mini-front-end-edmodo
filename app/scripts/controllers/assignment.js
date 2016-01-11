'use strict';

angular.module('myApp')
	.controller('AssignmentCtrl', ['assignmentFactory', '$http', '$scope', '$log', '$location', function(assignmentFactory, $http, $scope, $log, $location){

		$scope.moment = moment;


		$scope.isActive = function(viewLocation){
			return viewLocation === $location.path();
		};

		var httpAssignmentsData = assignmentFactory.getAssignments();

		httpAssignmentsData.then(function(response){
			$scope.assignments = response.data;
			assignmentFactory.assignments = response.data;
		}, function(response){
			var error = response.error.status;
			$log.log('An error occurred. Status: ' + error);
		});

	}]);