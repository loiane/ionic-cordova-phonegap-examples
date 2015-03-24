angular.module('starter.controllers', [])

    .controller('CORSDisabledCtrl', function ($scope, $http) {

        $scope.loadCountries = function(){

            $scope.countries = [];

            var ajaxRequest = $http.get("http://localhost/cors-phonegap/getcountries-nocors.php");

            ajaxRequest.success(function(data, status, headers, config) {
                $scope.countries = data;
                alert("Countries loaded!");
            });

            ajaxRequest.error(function(data, status, headers, config) {
                alert("AJAX failed!");
            });
        }
    })

    .controller('CORSEnabledCtrl', function ($scope, $http) {

        $scope.loadCountries = function() {

            $scope.countries = [];

            var ajaxRequest = $http.get("http://localhost/cors-phonegap/getcountries-cors.php");

            ajaxRequest.success(function (data, status, headers, config) {
                $scope.countries = data;
                alert("Countries loaded!");
            });

            ajaxRequest.error(function (data, status, headers, config) {
                alert("AJAX failed!");
            });
        };
    });
