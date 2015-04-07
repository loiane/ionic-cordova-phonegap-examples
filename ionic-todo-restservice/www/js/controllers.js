angular.module('tasks.controllers', ['ionic'])

    .controller('TasksCtrl', function ($scope, $ionicModal, $ionicPopup, TasksService) {

        $scope.data = {
            showDelete: false
        };

        var loadTasks = function () {
            $scope.tasks = TasksService.query();
        };

        loadTasks();


        var createTask = function (taskName) {
            var newTask = new TasksService();
            newTask.name = taskName;

            TasksService.save({name: taskName}, function () {
                alert('task created');
                loadTasks();
            });

        };

        $scope.add = function () {
            var taskName = prompt('Enter task name');
            if (taskName) {
                createTask(taskName);
            }
        };

        var editTask = function (taskName, task) {

            TasksService.update({id: task._id}, {name: taskName}, function () {
                alert('task updated');
                loadTasks();
            });
        };

        $scope.edit = function (task) {
            var taskName = prompt('Edit task name');
            if (taskName) {
                editTask(taskName, task);
            }
        };

        $scope.moveItem = function (task, fromIndex, toIndex) {
            $scope.tasks.splice(fromIndex, 1);
            $scope.tasks.splice(toIndex, 0, task);
        };

        $scope.onItemDelete = function (task) {

            TasksService.delete({}, {id: task._id}, function () {
                alert('task removed');
                loadTasks();
            });
        };
    });
