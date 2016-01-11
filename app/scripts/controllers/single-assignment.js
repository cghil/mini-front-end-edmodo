'use strict';

angular.module('myApp')
    .controller('SingleAssignmentCtrl', ['assignmentFactory', 'submissionFactory', '$http', '$scope', '$log', "$routeParams", '$location', '$filter', function(assignmentFactory, submissionFactory, $http, $scope, $log, $routeParams, $location, $filter) {
    	var httpSubmissions;
    	// should I move functions to service to make code more module
        function createVariablesBasedOnRoute() {
            assignmentId = $routeParams.id || {
                error: 'Please select an assignment'
            };
            $scope.isAssignmentSelected = assignmentFactory.isAssignmentSelected(assignmentId);
            $scope.message = assignmentId;

            if ($scope.isAssignmentSelected === true) {
                $scope.assignmentId = assignmentId;
            }
        };

        function getAssignmentAndSubmissionsData(newVal){
        	if(newVal !== null){
        		var assignmentsData = newVal;
        		$scope.assignment = $filter('filter')(assignmentsData, {id: assignmentId});
        		var creatorId = $scope.assignment[0].creator.id;
        		return submissionFactory.getSubmissions(assignmentId, creatorId);
        	}
        };

        function saveSubmissions(){
        	httpSubmissions.then(function(response){
        		$scope.submissions = response.data;
        		return response.data
        	});
        };

        function switchTabValues(value){
        	if (value === "assignment"){
        		$scope.showAssignment = true;
        		$scope.showSubmissions = false; 
        	} else {
        		$scope.showSubmissions = true;
        		$scope.showAssignment = false;
        	}
        };
        // --- end of functions

        $scope.showAssignment = true;
        $scope.showSubmissions = false;

        $scope.switchTabs = function(value){
        	switchTabValues(value);
        };

        var assignmentId = $routeParams.id || {
            error: 'Please select an assignment'
        };

        $scope.noAssignmentSelected = function(viewLocation) {
            return viewLocation === $location.path();
        };


        $scope.$watch('$routeParams.id', function() {
            createVariablesBasedOnRoute();
        });

        $scope.$watch(function(){
        	return assignmentFactory.assignments;
        }, function(newVal, oldVal){
        	if (newVal !==null){
	        	httpSubmissions = getAssignmentAndSubmissionsData(newVal);
	        	submissionFactory.submissions = saveSubmissions();
        	}
        });

        $scope.$watch(function(){
        	return submissionFactory.submissions;
        }, function(newVal, oldVal){
        	if(newVal !== null){
        		// debugger
        		$log.log(newVal);
        		submissionFactory.submissions = newVal;
        		$scope.submissions = submissionFactory.submissions;
        	}
        });

    }]);