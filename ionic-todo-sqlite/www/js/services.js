angular.module('tasks.services', [])

    .factory("TasksService", function ($q) {

        var db;

        function createDB() {
            try {
                db = window.sqlitePlugin.openDatabase({name: "tasks.db", createFromLocation: 1});
            } catch (err) {
                alert("Error processing SQL: " + err);
            }
            console.log('tasks database created');
        }

        function getTasks(){
            var outputResults = [];
            /*db.transaction(function(tx) {
                tx.executeSql("SELECT * FROM tasks", [], function(tx, res) {
                    console.log("res.rows.length: " + res.rows.length + " -- should be 1");
                    console.log("res.rows.item(0).cnt: " + res.rows.item(0).task_id + "");

                    var len = res.rows.length;

                    for (var i=0; i<len; i++){
                        var task = {
                            'id'  : res.rows.item(i).task_id,
                            'name': res.rows.item(i).task_name
                        };
                        console.log(res.rows.item(i).task_name);
                        outputResults.push(task);
                    }
                });
            });*/
            return promisedQuery("SELECT * FROM tasks", [],
                defaultResultHandler,
                defaultErrorHandler);
        }

        function createTask(name){
            /*db.transaction(function(tx) {
                tx.executeSql("INSERT INTO tasks(task_name) VALUES (?)", [name], function(tx, res) {
                    console.log("insertId: " + res.insertId + " -- probably 1");
                    console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                });
            });*/
            return promisedQuery("INSERT INTO tasks(task_name) VALUES (?)", [name],
                defaultResultHandler,
                defaultErrorHandler);
        }

        function updateTask(name, id){
            return promisedQuery("UPDATE tasks SET task_name= ? WHERE task_id = ? ", [name, id],
                defaultResultHandler,
                defaultErrorHandler);
        }

        function deleleTask(id){
            return promisedQuery("DELETE FROM tasks where task_id = ? ", [id],
                defaultResultHandler,
                defaultErrorHandler);
        }

        function promisedQuery(query, params, successCallback, errorCallback) {
            var deferred = $q.defer();
            db.transaction(function(tx){
                tx.executeSql(query, params, successCallback(deferred), errorCallback(deferred));
            }, errorCallback);
            return deferred.promise;
        }

        function defaultResultHandler(deferred) {
            return function(tx, results) {

                console.log("res.rows.length: " + results.rows.length);

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
            add: function(name) {
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