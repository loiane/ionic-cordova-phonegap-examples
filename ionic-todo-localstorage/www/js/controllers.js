angular.module('todo.controllers', [])

    .controller('TasksCtrl', function($scope) {

        $scope.tasks = [
            { name: 'Collect coins' },
            { name: 'Eat mushrooms' },
            { name: 'Get high enough to grab the flag' },
            { name: 'Find the Princess' }
        ];
    });