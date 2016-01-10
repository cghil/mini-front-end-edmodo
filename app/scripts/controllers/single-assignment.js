'use strict';

angular.module('myApp')
	.controller('HelloCtrl', ['assignmentFactory', '$http', '$scope', '$log', function(assignmentFactory, $http, $scope, $log){
		
		$scope.hello = "fucked up";


	}]);