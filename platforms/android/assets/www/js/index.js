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
        app.receivedEvent('deviceready');

        if (navigator.notification) { // Override default HTML alert with native dialog
                        window.alert = function (message) {
                            navigator.notification.alert(
                                message,    // message
                                null,       // callback
                                "Workshop", // title
                                'OK'        // buttonName
                            );
                        };
                    }
        if ( typeof localCallback != 'undefined' ) {
            localCallback();
        }

        $('#lvl').text(getUserLevel());
        $('#userName').text(getUser());

        processCurrentQuest();

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        try{
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id);

        } catch (err) {
            console.log(err.message);
        }
    }
};



function createCookie(name,value) {
    window.localStorage.setItem(name, value);
//	if (days) {
//		var date = new Date();
//		date.setTime(date.getTime()+(days*24*60*60*1000));
//		var expires = "; expires="+date.toGMTString();
//	}
//	else var expires = "";
//
//	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    return window.localStorage.getItem(name);
//	var nameEQ = name + "=";
//	var ca = document.cookie.split(';');
//    alert(ca);
//	for(var i=0;i < ca.length;i++) {
//		var c = ca[i];
//		while (c.charAt(0)==' ') c = c.substring(1,c.length);
//		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
//	}
//	return null;
}

function eraseCookie(name) {
    window.localStorage.removeItem(name);

}


function getUser(){
    return readCookie("loginUserEmail");
}

function getUserLevelKey(){
    var email = getUser();
    return email+"Level";
}

function getUserLevel(){
     var email = getUser();
     if(null==email){
        return 0;
     }else{
        var userLevel = email+"Level";
        var cookieExists = readCookie(userLevel);
        if(null!=cookieExists){
            return cookieExists;
        }else{
            createCookie(userLevel,0);
            return 0;
        }
     }
}

/**
* Will level up the current profile
**/
function lvlUp(){
    var user = getUser();
    if(user){
        var level = parseInt(getUserLevel());
        var userLevelKey = getUserLevelKey();
        createCookie(userLevelKey,level+1);
    }
}


var currentQuest;
var QuestsList = [
    {exp: 101, title: 'Find HR', descr: 'Try to find the HR location.', ico:'group', done: false},
    {exp: 150, title: 'Find The DOCTeam', descr: 'Embark on a glorious quest to find the documentation team.', ico:'folder', done: false},
    {exp: 100, title: 'Find the DMS team', descr: 'Try to find the DMS team.', ico:'car', done: false},
    {exp: 200, title: 'Visit your BOSS', descr: 'Visit your boss but try to not to anger him.', ico:'male', done: false},
    {exp: 250, title: 'Tour the floor', descr: 'Take a tour of the floor of the building. Look for three clues at both ends of the floor and one in the middle of the floor. The clues will be found where "one can clench one&#39;s thirst".', ico:'retweet', done: false},
    {exp: 200, title: 'Get a drink', descr: 'One of the fridges in the building has a quest "stamp" on it. Try to find it and win a prize.', ico:'glass', done: false},
    {exp: 300, title: 'Find the Treasure!', descr: 'Try to find a special relic of special value to the buisness.', ico:'gift', done: false}
////    {exp: 450, title: '', descr: '.', ico:'group'},
];


function getQuestsKey() {
    var email = getUser();
    return email+"Missions";
}
function getQuests()
{
    var email = getUser();
         if(null==email){
            return 0;
         }else{
            var userMissions = getQuestsKey();
            var cookieExists = readCookie(userMissions);
            if(null!=cookieExists){
                return JSON.parse(cookieExists);
            }else{
                createCookie(userMissions,JSON.stringify(QuestsList));
                return QuestsList;
            }
         }
}

function getCurrentQuest()
{
    var quests = getQuests();
    for (var i in quests) {
        if (quests[i].done == false) {
            return quests[i];
        }
    }
}

function processCurrentQuest()
{
    currentQuest = getCurrentQuest();
    if (currentQuest) {
        var mainQuest = $('.main-quest:not(".hidden")');
        if (mainQuest) {
            mainQuest.find('h1').text(currentQuest.title + ' - ' + currentQuest.exp + ' EXP');
            mainQuest.find('p.lead').html(currentQuest.descr);
            mainQuest.find('i').removeClass('fa-group');
            mainQuest.find('i').addClass('fa-' + currentQuest.ico);
        }
    }

}

function finishCurrentQuest()
{
    var quests = getQuests();
    for (var i in quests) {
        if (quests[i].done == false) {
            quests[i].done = true;
            break;
        }
    }
    var userMissions = getQuestsKey();
    createCookie(userMissions,JSON.stringify(quests));
}

// keep this at the end!!!
app.initialize();

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
if (isChrome) {
        // hack to test in chrome
        app.onDeviceReady();
    }