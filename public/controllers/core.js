var app = angular.module('App', []);

//CONTROLLERS
app.controller('profileCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.formData = "";
	
	// GRAB ALL TODOS
	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
	// CREATE THE TODO
	$scope.createTodoTask = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData.text = "";
				$scope.formData.priority = "";
				$scope.todos = data;
				console.log(data);
		})
			.error(function(data) {
				console.log('Error: ' + data);
		});
	};
	
	// DELETE THE TODO
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
				console.log(data);
		})
			.error(function(data) {
				console.log('Error: ' + data);
		});
	};
	
	// EDIT THE USER PROFILE
	$scope.editProfile = function() {
		$http.post('/edit', $scope.editFormData)
			.success(function(data) {
				$scope.user = data;
				console.log(data);
		})
			.error(function(data) {
				console.log('Error: ' + data);
		});
	};
}]);

