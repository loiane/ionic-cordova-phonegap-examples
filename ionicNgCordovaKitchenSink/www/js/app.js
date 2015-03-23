// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlist.html",
                        controller: 'PlaylistCtrl'
                    }
                }
            })

            .state('app.start', {
                url: "/start",
                views: {
                    'menuContent': {
                        templateUrl: "templates/start.html"
                    }
                }
            })

            .state('app.device', {
                url: "/device",
                views: {
                    'menuContent': {
                        templateUrl: "templates/device.html",
                        controller: 'DeviceCtrl'
                    }
                }
            })

            .state('app.network', {
                url: "/network",
                views: {
                    'menuContent': {
                        templateUrl: "templates/network.html",
                        controller: 'NetworkCtrl'
                    }
                }
            })

            .state('app.dialogs', {
                url: "/dialogs",
                views: {
                    'menuContent': {
                        templateUrl: "templates/dialogs.html",
                        controller: 'DialogsCtrl'
                    }
                }
            })

            .state('app.geolocation', {
                url: "/geolocation",
                views: {
                    'menuContent': {
                        templateUrl: "templates/geolocation.html",
                        controller: 'GeolocationCtrl'
                    }
                }
            })

            .state('app.batteryStatus', {
                url: "/batteryStatus",
                views: {
                    'menuContent': {
                        templateUrl: "templates/batteryStatus.html",
                        controller: 'BatteryStatusCtrl'
                    }
                }
            })

            .state('app.contacts', {
                url: "/contacts",
                views: {
                    'menuContent': {
                        templateUrl: "templates/contacts.html",
                        controller: 'ContactsCtrl'
                    }
                }
            })

            .state('app.deviceMotion', {
                url: "/deviceMotion",
                views: {
                    'menuContent': {
                        templateUrl: "templates/deviceMotion.html",
                        controller: 'DeviceMotionCtrl'
                    }
                }
            })

            .state('app.deviceOrientation', {
                url: "/deviceOrientation",
                views: {
                    'menuContent': {
                        templateUrl: "templates/deviceOrientation.html",
                        controller: 'DeviceOrientationCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/start');
    });
