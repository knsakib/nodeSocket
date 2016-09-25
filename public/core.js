'use strict';

var appmodule = angular.module('appmodule', []);

appmodule.controller('mainController', function($scope, $http) {

$http.get('/api/data')
      .success(function(data) {
  			$scope.todos = data;
  		});

});

appmodule.controller('socketController', function($scope, socket) {

  socket.on('chat message', function(msg){
    $scope.data=msg;
    });
});


appmodule.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});
