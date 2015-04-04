angular.module('tasks.controllers', ['ionic'])

    .controller('TasksCtrl', function($scope, $ionicModal, $ionicPopup, TasksService) {

        $scope.data = {
            showDelete: false
        };

        //setup DB
        TasksService.createDB();


        //load tasks
        $scope.loadTasks = function() {
            TasksService.all().then(function (results) {
                $scope.tasks = results;
            });
        };

        $scope.loadTasks();


        var createTask = function(taskName) {
            TasksService.create(taskName).then(function(){
                $scope.loadTasks();
            });
        };

        $scope.add = function() {
            var taskName = prompt('Enter task name');
            if(taskName) {
                createTask(taskName);
            }
        };

        var editTask = function(taskName, task){
            TasksService.update(taskName, task.id).then(function(){
                $scope.loadTasks();
            });
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
            //$scope.tasks.splice($scope.tasks.indexOf(task), 1);
            TasksService.destroy(task.id).then(function(){
                $scope.loadTasks();
            });
        };
    });
