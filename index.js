'use strict';

var credentials = {
    apiKey: "AIzaSyCGAhEirtKDNysgXK5b4fYU4AHZlK2d2M8",
    authDomain: "profapp-e3c81.firebaseapp.com",
    databaseURL: "https://profapp-e3c81.firebaseio.com",
    projectId: "profapp-e3c81",
    storageBucket: "profapp-e3c81.appspot.com",
    messagingSenderId: "790698105863"
};

const Alexa = require('alexa-sdk');
const firebase = require('firebase');
firebase.initializeApp({
    databaseURL: 'https://profapp-e3c81.firebaseio.com',
    serviceAccount: credentials
});

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            SKILL_NAME: 'Space Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a space fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-US': {
        translation: {
            SKILL_NAME: 'American Space Facts',
        },
    },
    'en-GB': {
        translation: {
            SKILL_NAME: 'British Space Facts',
        },
    },
    'de': {
        translation: {
            SKILL_NAME: 'Weltraumwissen auf Deutsch',
            GET_FACT_MESSAGE: 'Hier sind deine Fakten: ',
            HELP_MESSAGE: 'Du kannst sagen, „Nenne mir einen Fakt über den Weltraum“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetDiscountsIntent': function () {
        this.emit('GetDiscount');
    },
    'GetDiscount': function () {
        var zip = this.event.request.intent.slots.city.value;
        // var ref = firebase.database().ref().child("states/NJ/"+zip);

        // ref.once('value').then((snapshot) => {
        // //alexa.emit(':ask', "Works");
        // this.emit(':tellWithCard',snapshot.val() + zip, this.t('SKILL_NAME'),snapshot.val() );
        // },
        // (err) => {
        //    this.emit(':tellWithCard',snapshot.val() + zip, this.t('SKILL_NAME'), snapshot.val());
        // });
        // var ref = firebase.database().ref().child("states/NJ/"+zip);
        // //var zip = this.event.request.intent.slots.city.value;
        // ref.once('value').then((snapshot) => {
        // //alexa.emit(':ask', "Works");
        // var i = 0;
        // var output = "";
        // var addString = "I found discounts at ";
        // var and = " and at ";
        // snapshot.forEach(function(child){
        //     if(i<2){
        //         if(i==1)
        //             and = "";
        //         output+=child.key + " from " + child.child("timeStart").val() + " to " + child.child("timeEnd").val() + and;
        //     }
        //     i++;
        // });
        // if(output.length==0){
        //     output = "Sorry, there are no discounts in your area";
        //     addString = "";
        // }
        // output = addString + output;
        // this.emit(':tellWithCard',output, this.t('SKILL_NAME'), output);
        // },
        // (err) => {
        // this.emit(':tellWithCard',"Sorry, I had trouble processing your request. Please try again.", this.t('SKILL_NAME'), "Sorry, I had trouble processing your request. Please try again.");
        // });
        var ref = firebase.database().ref().child("states/NJ/"+"08536");
        //var zip = this.event.request.intent.slots.city.value;
        ref.once('value').then((snapshot) => {
        //alexa.emit(':ask', "Works");
        var i = 0;
        var output = "";
        var addString = "I found a discount at ";
        var and = " and at ";
        snapshot.forEach(function(child){
            if(i<1){
                output+=child.key + " from " + child.child("timeStart").val() + " to " + child.child("timeEnd").val();
                var food = child.child('foodOptions');
                var count = 0;
                food.forEach(function(foodChild){
                    if(count==0)
                        output+= " . They are offering " + foodChild.child('name').val();
                    else if(count==1)
                        output+= " and " + foodChild.child('name').val();
                    count++;
                });
                output+= " for " + child.child("priceOfBox").val() + " dollars each";
            }
            i++;
        });
        if(output.length==0){
            output = "Sorry, there are no discounts in your area";
            addString = "";
        }
        output = addString + output;
        this.emit(':tellWithCard',output, this.t('SKILL_NAME'), output);
        },
        (err) => {
        this.emit(':tellWithCard',"Sorry, I had trouble processing your request. Please try again.", this.t('SKILL_NAME'), "Sorry, I had trouble processing your request. Please try again.");
        });
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

