angular.module('tasks.services', [])

    .factory("TasksService", function () {

        var key = 'tasks';

        function getTasks(){
            var tasks = window.localStorage[key];
            if(tasks) {
                return angular.fromJson(tasks);
            }
            return [];
        }

        function save(tasks){
            window.localStorage[key] = angular.toJson(tasks);
        }

        function getNextId(){
            var taskId = window.localStorage['taskId'];
            if (taskId){
                taskId++;
            } else {
                taskId = 1;
            }
            window.localStorage['taskId'] = taskId;
            return taskId;
        }

        return {
            all: function() {
                return getTasks();
            },
            save: function(tasks) {
                return save(tasks);
            },
            getNextId: function(){
                return getNextId();
            }
        }

    });