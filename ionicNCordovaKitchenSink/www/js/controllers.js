angular.module('starter.controllers', ['ngCordova'])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogin();
            }, 1000);
        };
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    })

    .controller('DeviceCtrl', function ($scope, $cordovaDevice) {

        var init = function () {
            console.log("initializing device");
            try {
                document.addEventListener("deviceready", function () {
                    $scope.available = $cordovaDevice.getDevice().available;
                    $scope.cordova = $cordovaDevice.getCordova();
                    $scope.model = $cordovaDevice.getModel();
                    $scope.platform = $cordovaDevice.getPlatform();
                    $scope.uuid = $cordovaDevice.getUUID();
                    $scope.version = $cordovaDevice.getVersion();
                }, false);
            }
            catch (err) {
                console.log("Error " + err.message);
                alert("error " + err.$$failure.message);
            }
        };

        init();
    })

    .controller('NetworkCtrl', function ($scope, $cordovaNetwork) {

        var init = function () {
            $scope.networkType = null;
            $scope.connectionType = null;

            document.addEventListener("deviceready", function () {
                $scope.networkType = $cordovaNetwork.getNetwork();

                if ($cordovaNetwork.isOnline()) {
                    $scope.connectionType = 'Online';
                }
                else if ($cordovaNetwork.isOffline()) {
                    $scope.connectionType = 'Offline';
                }
                else {
                    $scope.errorMsg = 'Error getting isOffline / isOnline methods';
                }
            }, false);
        };

        init();

        $scope.refresh = function () {
            console.log('Network refresh');
            init();
        };
    })

    .controller('DialogsCtrl', function ($scope, $cordovaDialogs) {

        $scope.action = "Press any button";

        $scope.alert = function () {
            $scope.action = "Alert";
            $cordovaDialogs.alert('Wow!');
        };

        $scope.confirm = function () {
            $scope.action = "Confirm";
            $cordovaDialogs.confirm('Are you sure?', "Custom title").then(function (buttonIndex) {
                $cordovaDialogs.alert("Button index : " + buttonIndex);
            });
        };

        $scope.prompt = function () {
            $scope.action = "Prompt";
            $cordovaDialogs.prompt('Please Login', "Custom title").then(function (result) {
                $cordovaDialogs.alert("Input: " + result.input1 + "\n Button index : " + result.buttonIndex);
            });
        };

        $scope.beep = function () {
            $scope.action = "Beep";
            $cordovaDialogs.beep(3);
        };
    })

    .controller('GeolocationCtrl', function ($scope, $cordovaGeolocation) {

        $scope.getLocation = function () {
            $cordovaGeolocation
                .getCurrentPosition({timeout: 10000, enableHighAccuracy: false})
                .then(function (position) {
                    console.log("position found");
                    $scope.position = position;
                    // long = position.coords.longitude
                    // lat = position.coords.latitude
                }, function (err) {
                    console.log("unable to find location");
                    $scope.errorMsg = "Error : " + err.message;
                });
        };

    })

    .controller('BatteryStatusCtrl', function ($scope, $timeout, $cordovaBatteryStatus) {

        console.log("battery status init");

        document.addEventListener("deviceready", function () {

            $scope.watch = function () {
                console.log("watching battery");

                $cordovaBatteryStatus.$on('batterystatus', function (result, info) {
                    $timeout(function () {
                        $scope.batteryLevel = info.level;       // (0 - 100)
                        $scope.isPluggedIn = info.isPlugged;   // bool
                    });
                    console.log("Info " + info.level + " " + info.isPlugged);
                    alert("Info " + info.level + " " + info.isPlugged);
                });
            };
        }, false);
    })

    .controller('ContactsCtrl', function ($scope, $log, $cordovaContacts) {

        $scope.pickContact = function () {
            document.addEventListener("deviceready", function () {
                $cordovaContacts.pickContact().then(function (result) {
                    console.log(JSON.stringify(result));
                    $scope.selectedContact = result;
                })
            }, false);
        };

        $scope.saveContact = function (contact) {
            document.addEventListener("deviceready", function () {
                $cordovaContacts.save(contact).then(function (result) {
                    console.log(JSON.stringify(result));
                })
            }, false);
        };


        $scope.removeContact = function (contact) {
            document.addEventListener("deviceready", function () {
                $cordovaContacts.remove(contact).then(function (result) {
                    console.log(JSON.stringify(result));
                })
            }, false);
        };

    })

    .controller('DeviceMotionCtrl', function ($scope, $cordovaDeviceMotion) {
        var watchID;

        $cordovaDeviceMotion
            .getCurrentAcceleration()
            .then(function (motion) {
                $scope.motion = motion;
                console.log(motion);
            }, function (err) {
                $scope.msg = err.message;
                console.log(err);
            });


        $scope.watchAcceleration = function () {
            var options = { frequency: 3000 };  // Update every 3 seconds

            $scope.this_watch = $cordovaDeviceMotion.watchAcceleration(options);

            $scope.this_watch.promise.then(
                function () {  /* unused */
                },
                function (err) {
                    $scope.msg = err.message;
                },
                function (motion) {
                    $scope.motion = motion;
                });
        };

        $scope.clearWatch = function () {
            // use watchID from watchAccelaration()
            $cordovaDeviceMotion.clearWatch($scope.this_watch.watchId);
        };
    })

    .controller('DeviceOrientationCtrl', function ($scope, $timeout, $cordovaDeviceOrientation) {

        var options = {frequency: 1000}; // Update every 1 seconds

        $scope.getHeading = function () {
            $cordovaDeviceOrientation
                .getCurrentHeading()
                .then(function (position) {
                    $scope.heading = position;
                }, function (err) {
                    $scope.msg = err.message;
                });
        };


        $scope.watchHeading = function () {
            $scope.this_watch = $cordovaDeviceOrientation.watchHeading(options);

            $scope.this_watch.then(
                function () {
                    /* unused */
                },
                function (err) {
                    $scope.msg = err.message;
                },
                function (position) {
                    $timeout(function () {
                        $scope.heading = position;
                    });
                }
            );

        };

        $scope.clearWatch = function () {
            $cordovaDeviceOrientation.clearWatch($scope.this_watch.watchID);
        };

    });

