var appmodule = angular.module('appmodule', []);

appmodule.controller('mainController', function($scope, $http) {

$http.get('/api/data')
      .success(function(data) {
  			$scope.todos = data;
  		});

})
