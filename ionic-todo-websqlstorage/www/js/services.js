angular.module('tasks.services', [])

    .factory("TasksService", function ($q) {

        var db;

        function createDB() {
            try {
                db = window.openDatabase("tasksDB", "1.0", "ToDoApp", 10*1024*1024);
                db.transaction(function(tx){
                    tx.executeSql("CREATE TABLE IF NOT EXISTS tasks (task_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, task_name VARCHAR(200) )",[]);
                });
            } catch (err) {
                alert("Error processing SQL: " + err);
            }
            console.log('tasks database created');
        }

        function getTasks(){
            return promisedQuery('SELECT * FROM tasks',
                defaultResultHandler,
                defaultErrorHandler);
        }

        function createTask(name){
            return promisedQuery("INSERT INTO tasks(task_name) VALUES ('" + name + "')",
                defaultResultHandler,
                defaultErrorHandler);
        }

        function updateTask(name, id){
            return promisedQuery("UPDATE tasks SET task_name='" + name + "' WHERE task_id = " + id,
                defaultResultHandler,
                defaultErrorHandler);
        }

        function deleleTask(id){
            return promisedQuery("DELETE FROM tasks where task_id = " + id,
                defaultResultHandler,
                defaultErrorHandler);
        }

        function promisedQuery(query, successCallback, errorCallback) {
            var deferred = $q.defer();
            db.transaction(function(tx){
                tx.executeSql(query, [], successCallback(deferred), errorCallback(deferred));
            }, errorCallback);
            return deferred.promise;
        }

        function defaultResultHandler(deferred) {
            return function(tx, results) {

                var len = results.rows.length,
                    outputResults = [];

                for (var i=0; i<len; i++){
                    var task = {
                        'id'  : results.rows.item(i).task_id,
                        'name': results.rows.item(i).task_name
                    };
                    outputResults.push(task);
                }

                deferred.resolve(outputResults);
            }
        }

        function defaultErrorHandler(deferred) {
            return function(tx, results) {
                var len = 0;
                var outputResults = '';
                deferred.resolve(outputResults);
            }
        }

        return {
            createDB: function(){
                return createDB();
            },
            all: function() {
                return getTasks();
            },
            create: function(name) {
                return createTask(name);
            },
            update: function(name, id) {
                return updateTask(name, id);
            },
            destroy: function(id) {
                return deleleTask(id);
            }
        }
    });