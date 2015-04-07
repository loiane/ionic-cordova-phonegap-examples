angular.module('tasks.services', ['ngResource'])

    .factory("TasksService", function ($resource){

        var data = $resource('http://localhost:8000/api/tasks/:id', {id : '@id'}, {
            update:{
                method:'PUT'
            }
        });

        return data;
    });