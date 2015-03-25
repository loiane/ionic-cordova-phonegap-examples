/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
    },

    alert: function() {
        function alertDismissed() {
            alert('user closed the alert');
        }

        navigator.notification.alert(
            'Phonegap/Codovar alert example',  // message
            alertDismissed,      // callback
            'Title',            // title
            'My button'         // buttonName
        );
    },

    confirm: function() {

        function onConfirm(buttonIndex) {
            alert('You selected button ' + buttonIndex);
        }

        navigator.notification.confirm(
            'Phonegap/Codovar confirm example', // message
            onConfirm,            // callback to invoke with index of button pressed
            'Title',           // title
            ['Restart','Exit']     // buttonLabels
        );
    },

    prompt: function(){

        function onPrompt(results) {
            alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
        }

        navigator.notification.prompt(
            'Please enter your name',  // message
            onPrompt,                  // callback to invoke
            'Registration',            // title
            ['Ok','Exit'],             // buttonLabels
            'Phonegap/Cordova'         // defaultText
        );
    },

    beep: function(){
        navigator.notification.beep(3);
    }
};
