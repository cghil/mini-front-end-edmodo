angular.module('myApp')
	.controller('SubmissionsCtrl', ['submissionFactory', '$http', '$scope', '$log', function(submissionFactory, $http, $scope, $log){

		$scope.moment = moment;

		$scope.$watch(function(){
			return submissionFactory.submissions;
		}, function(newVal, oldVal){
			if(newVal){
				$scope.submissions = newVal;
			}
		});

	}]);