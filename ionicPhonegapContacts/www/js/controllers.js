angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

    .controller('contactsCtrl', function($scope, $cordovaContacts){
        $scope.getContacts = function() {
            $scope.phoneContacts = [];

            console.log('***********************************');

            function onSuccess(contacts) {
                for (var i = 0; i < contacts.length; i++) {
                    var contact = contacts[i];
                    $scope.phoneContacts.push(contact);
                }
            }

            function onError(contactError) {
                console.log(contactError);
            }

            var options = {};
            options.multiple = true;

            $cordovaContacts.find(options).then(onSuccess, onError);
        };
    });
