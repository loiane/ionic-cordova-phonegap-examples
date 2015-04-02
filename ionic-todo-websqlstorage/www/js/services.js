angular.module('todo.services', [])

    .factory("TasksService", function ($q) {

        var db;
        var task='';
        var deltask;

        function createDB() {
            try {
                db = window.openDatabase("todoDB", "1.0", "ToDoApp", 10*1024*1024);
                db.transaction(function(tx){
                    tx.executeSql("CREATE TABLE IF NOT EXISTS tasks (task_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, task_name VARCHAR(100) )",[]);
                });
            } catch (err) {
                alert("Error processing SQL: " + err);
            }
            console.log('database created');
        }

        function setTasks(tname){
            return promisedQuery("INSERT INTO tasks(task_name) VALUES ('" + tname + "')", defaultResultHandler, defaultErrorHandler);
        }

        function delTasks(tid){
            return promisedQuery("DELETE FROM tasks where task_id = " + tid, defaultResultHandler, defaultErrorHandler);
        }

        function UpdateTasks(tname, tid){
            return promisedQuery("UPDATE tasks SET task_name='" + tname + "' WHERE task_id = " + tid, defaultResultHandler, defaultErrorHandler);
        }

        function getTasks(){
            return promisedQuery('SELECT * FROM tasks', defaultResultHandler, defaultErrorHandler);
        }

        function defaultResultHandler(deferred) {
            return function(tx, results) {
                var len = results.rows.length;
                var output_results = [];

                for (var i=0; i<len; i++){
                    var t = {'task_id':results.rows.item(i).task_id,'task_name':results.rows.item(i).task_name};
                    output_results.push(t);
                }

                deferred.resolve(output_results);
            }
        }

        function defaultErrorHandler(deferred) {
            return function(tx, results) {
                var len = 0;
                var output_results = '';
                deferred.resolve(output_results);
            }
        }

        function promisedQuery(query, successCB, errorCB) {
            var deferred = $q.defer();
            db.transaction(function(tx){
                tx.executeSql(query, [], successCB(deferred), errorCB(deferred));
            }, errorCB);
            return deferred.promise;
        }

        return {
            setup: function() {
                return createDB();
            },
            set: function(t_name) {
                return setTasks(t_name);
            },
            destroy: function(taskid) {
                return delTasks(taskid);
            },
            edit: function(t_name,taskid) {
                return UpdateTasks(t_name, taskid);
            },
            all: function() {
                return getTasks();
            }
        }
    });