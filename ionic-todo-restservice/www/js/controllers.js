angular.module('tasks.controllers', ['ionic'])

    .controller('TasksCtrl', function($scope, $ionicModal, $ionicPopup, TasksService) {

        $scope.data = {
            showDelete: false
        };

        // Load or initialize tasks
        $scope.tasks = TasksService.all();


        var createTask = function(taskName) {
            var newTask = {
                id: TasksService.getNextId(),
                name: taskName
            };
            $scope.tasks.push(newTask);
            TasksService.save($scope.tasks);
        };

        $scope.add = function() {
            var taskName = prompt('Enter task name');
            if(taskName) {
                createTask(taskName);
            }
        };

        var editTask = function(taskName, task){
            for(var i=0; i<$scope.tasks.length; i++){
                if ($scope.tasks[i].id === task.id){
                    $scope.tasks[i].name = taskName;
                    break;
                }
            }
            TasksService.save($scope.tasks);
        };

        $scope.edit = function(task) {
            var taskName = prompt('Edit task name');
            if(taskName) {
                editTask(taskName, task);
            }
        };

        $scope.moveItem = function(task, fromIndex, toIndex) {
            $scope.tasks.splice(fromIndex, 1);
            $scope.tasks.splice(toIndex, 0, task);
        };

        $scope.onItemDelete = function(task) {
            $scope.tasks.splice($scope.tasks.indexOf(task), 1);
            TasksService.save($scope.tasks);
        };
    });
