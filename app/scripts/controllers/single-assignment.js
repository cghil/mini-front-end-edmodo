'use strict';

angular.module('myApp')
    .controller('SingleAssignmentCtrl', ['assignmentFactory', '$http', '$scope', '$log', "$routeParams", '$location', function(assignmentFactory, $http, $scope, $log, $routeParams, $location) {

        var assignmentId = $routeParams.id || {
            error: 'Please select an assignment'
        };

        $scope.noAssignmentSelected = function(viewLocation) {
            return viewLocation === $location.path();
        };

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

        $scope.$watch('$routeParams.id', function() {
            createVariablesBasedOnRoute();
        });

    }]);