'use strict';

angular.module('myApp')
    .controller('SingleAssignmentCtrl', ['assignmentFactory', '$http', '$scope', '$log', "$routeParams", '$location', '$filter', function(assignmentFactory, $http, $scope, $log, $routeParams, $location, $filter) {

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
        	return assignmentFactory.assignments
        }, function(newVal, oldVal){
        	var assignmentsData = newVal;
        	$scope.assignment = $filter('filter')(assignmentsData, {id: assignmentId});
        });


    }]);