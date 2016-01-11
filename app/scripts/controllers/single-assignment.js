'use strict';

angular.module('myApp')
    .controller('SingleAssignmentCtrl', ['assignmentFactory', 'submissionFactory', '$http', '$scope', '$log', "$routeParams", '$location', '$filter', function(assignmentFactory, submissionFactory, $http, $scope, $log, $routeParams, $location, $filter) {
    	var httpSubmissions;

    	$scope.moment = moment;

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
        	if(newVal !== null && $routeParams.id !== undefined){
        		var assignmentsData = newVal;
        		$scope.assignment = $filter('filter')(assignmentsData, {id: assignmentId});
        		var creatorId = $scope.assignment[0].creator.id;
        		return submissionFactory.getSubmissions(assignmentId, creatorId);
        	}
        };

        function saveSubmissions(){
        	httpSubmissions.then(function(response){
        		$scope.submissions = response.data;
        		submissionFactory.submissions = response.data;
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

        // using $watch variables... should change to $broadcast if I have more time
        $scope.$watch('$routeParams.id', function() {
            createVariablesBasedOnRoute();
        });

        $scope.$watch(function(){
        	return assignmentFactory.assignments;
        }, function(newVal, oldVal){
        	if (newVal !==null && $routeParams.id){
	        	httpSubmissions = getAssignmentAndSubmissionsData(newVal);
	        	saveSubmissions();
        	}
        });

        $scope.$watch(function(){
        	return submissionFactory.submissions;
        }, function(newVal, oldVal){
        	if(newVal !== null){
        		submissionFactory.submissions = newVal;
        		$scope.submissions = submissionFactory.submissions;
        	}
        });

    }]);