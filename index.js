/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';


var credentials = {
  "type": "service_account",
  "project_id": "alexa-d71e1",
  "private_key_id": "eb0cd5e81154f8d7adead31a9bdef4ed5c804f9a",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDMmrQnVnbG4kdN\nz9aVJJ2PhMe+WaE9h2Z85iYPDRj4t3V/wTncj6Ux1n4LHo63nHRMYlCV3UcxRDzO\nGtaK1Bcp7w+CcazVAaHtAB5VQZZga38qT2dgHg3i+dHcL1I1V+uzwaXmc+Z2qErL\nzxQPP5WvAQIFQMXsnFWXuWezUD9NUdmhw5+klmJvGBNtAi4ZiQP7nsWuxy4O0VLg\nSo6WrepTUfbryUziIVnm8iLcbDv0+CwCMGAAHQNDm+6hgXUXQwaJRXVncDhXrYSV\nlDE/7mvzyj8O3N9eWnmEiBPCDA5iJK1dPqfO43B9cOQg69RjSp6o/cdsKyX85NlL\nIsSAk9l/AgMBAAECggEAWZm2IzP+OAKH70+BTTcHuP4Q6w8dSXCuNSwkppq5wNG2\npwfbaveNBFJGSGBNZ6MgWwMC/14z+yNC7Y9bPNi8fCSwyhM1+OIKI1vV7MgYLolk\n2waC4tjGhAubF62xdqLWGZZILK+80WHJv48j3bmet1Ddrac8Be5AnX0YKLKPxi+0\no8mdObYKpKhiju0JosNXERf1P56raiCO2u30V9AI6TMJH/777P1xhDWsgl9HO0y1\nY+2l/88G8/e3MEWGpXWjWNMNIyOnL+LBTfGcJeMvVproaZm1OcobeHSFc6HJuXBA\nPKxGc9lGKExpDhulY0neQO/YJYwET1gtwVGpMQGNAQKBgQD7c+el4X5gq00bY4YX\nuUCjg9UiZ6cmwdnw3wemr1XjrTv7E22KxK3Rqk29Eky4LGXEJoB591TIrMTxN/yP\nEmZ8zuiTTEBC9nY+mQqAzh1+e+Vx3pzXgsRx3GG1RAYl64Kx+2vPuedT18/WA2VU\nJ9dcNA7dFDwPJGkipFtLvhH2HwKBgQDQTeo9Bhs3Apjq6cTwl+X04/n2aim978WZ\n60+vg7ATjcDCsgCG0OgcOHBxIpwqGRnWtWA+r0n4aa53L60nkjiMT4RmB3w4bO/n\nZN/M/h0XoB7A8iYjTLtEnDKEz4WOmALWMia79yjDwWaHXgcO9aHX23UPeS+LoVGH\n06IqEBXwoQKBgQCH+Pon4lMDlT5B9ER7qaqBgXWMgD6MH8FplkE96oxobLIFqFDQ\n/F/+A7i76Bxib2esdSF+UrefOIXa5uqEt2+CSCTOGiqZy0rPuNRMKKkcT4UYWUe4\n5jayV3jim2EzujHXaty23JFx7j6uPPHbWxwC+QeclyePDKJpoDTaNXLjAwKBgBzn\nkudg34nknF+MjL1t9oTi1Z6x4JTwnpTbKDWMqnQsKWFa3ePXPT4dPs0UJmNZFFLM\n3EwWesczsvfq77Yb/ijKJ+8Yfs49n5SWVM/XOyY6G8peT5h6X0oH+qKfQUMmKM6c\nKu/OPiPbxGRoUcZro0eWtkmtYUGY4v1cCpaXoNPBAoGALaDJerW7PrvhafdfrMZ7\nUdG6GJOsALnZHN2takB1IU2STOJy9xbgpgCac8LcsLDCH7QBwxbb5xTB8DgqWdJE\nHOTpu32dAfbmVdjrVU4rd2SOKZCzsyv360MA71/god1ypY1f5WHO65355m9xLKTe\nqwtWlY+E6I5X6a1F4GRx9D0=\n-----END PRIVATE KEY-----\n",
  "client_email": "alexa-service-account@alexa-d71e1.iam.gserviceaccount.com",
  "client_id": "102618368279067528310",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/alexa-service-account%40alexa-d71e1.iam.gserviceaccount.com"
};
const Alexa = require('alexa-sdk');
const firebase = require('firebase');
firebase.initializeApp({
    databaseURL: 'https://alexa-d71e1.firebaseio.com/',
    serviceAccount: credentials
});

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            FACTS: [
                'A year on Mercury is just 88 days long.',
                'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
                'Venus rotates anti-clockwise, possibly because of a collision in the past with an asteroid.',
                'On Mars, the Sun appears about half the size as it does on Earth.',
                'Earth is the only planet not named after a god.',
                'Jupiter has the shortest day of all the planets.',
                'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
                'The Sun contains 99.86% of the mass in the Solar System.',
                'The Sun is an almost perfect sphere.',
                'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
                'Saturn radiates two and a half times more energy into space than it receives from the sun.',
                'The temperature inside the Sun can reach 15 million degrees Celsius.',
                'The Moon is moving approximately 3.8 cm away from our planet every year.',
            ],
            SKILL_NAME: 'Space Facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a space fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-US': {
        translation: {
            FACTS: [
                'A year on Mercury is just 88 days long.',
                'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
                'Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.',
                'On Mars, the Sun appears about half the size as it does on Earth.',
                'Earth is the only planet not named after a god.',
                'Jupiter has the shortest day of all the planets.',
                'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
                'The Sun contains 99.86% of the mass in the Solar System.',
                'The Sun is an almost perfect sphere.',
                'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
                'Saturn radiates two and a half times more energy into space than it receives from the sun.',
                'The temperature inside the Sun can reach 15 million degrees Celsius.',
                'The Moon is moving approximately 3.8 cm away from our planet every year.',
            ],
            SKILL_NAME: 'American Space Facts',
        },
    },
    'en-GB': {
        translation: {
            FACTS: [
                'A year on Mercury is just 88 days long.',
                'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
                'Venus rotates anti-clockwise, possibly because of a collision in the past with an asteroid.',
                'On Mars, the Sun appears about half the size as it does on Earth.',
                'Earth is the only planet not named after a god.',
                'Jupiter has the shortest day of all the planets.',
                'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
                'The Sun contains 99.86% of the mass in the Solar System.',
                'The Sun is an almost perfect sphere.',
                'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
                'Saturn radiates two and a half times more energy into space than it receives from the sun.',
                'The temperature inside the Sun can reach 15 million degrees Celsius.',
                'The Moon is moving approximately 3.8 cm away from our planet every year.',
            ],
            SKILL_NAME: 'British Space Facts',
        },
    },
    'de': {
        translation: {
            FACTS: [
                'Ein Jahr dauert auf dem Merkur nur 88 Tage.',
                'Die Venus ist zwar weiter von der Sonne entfernt, hat aber höhere Temperaturen als Merkur.',
                'Venus dreht sich entgegen dem Uhrzeigersinn, möglicherweise aufgrund eines früheren Zusammenstoßes mit einem Asteroiden.',
                'Auf dem Mars erscheint die Sonne nur halb so groß wie auf der Erde.',
                'Die Erde ist der einzige Planet, der nicht nach einem Gott benannt ist.',
                'Jupiter hat den kürzesten Tag aller Planeten.',
                'Die Milchstraßengalaxis wird in etwa 5 Milliarden Jahren mit der Andromeda-Galaxis zusammenstoßen.',
                'Die Sonne macht rund 99,86 % der Masse im Sonnensystem aus.',
                'Die Sonne ist eine fast perfekte Kugel.',
                'Eine Sonnenfinsternis kann alle ein bis zwei Jahre eintreten. Sie ist daher ein seltenes Ereignis.',
                'Der Saturn strahlt zweieinhalb mal mehr Energie in den Weltraum aus als er von der Sonne erhält.',
                'Die Temperatur in der Sonne kann 15 Millionen Grad Celsius erreichen.',
                'Der Mond entfernt sich von unserem Planeten etwa 3,8 cm pro Jahr.',
            ],
            SKILL_NAME: 'Weltraumwissen auf Deutsch',
            GET_FACT_MESSAGE: 'Hier sind deine Fakten: ',
            HELP_MESSAGE: 'Du kannst sagen, „Nenne mir einen Fakt über den Weltraum“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
        },
    },
};

function push(){
  var ref = firebase.database().ref().child("Text");
  ref.set("WOWZA");
}

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        // var ref = firebase.database().ref().child("Text").set("OMG");
        // ref.then(() => {
        // //alexa.emit(':ask', "Works");
        // this.emit(':tellWithCard',speechOutput, this.t('SKILL_NAME'), randomFact);
        // },
        // (err) => {
        //     this.emit(':tellWithCard',"oh no", this.t('SKILL_NAME'), randomFact);
        // });
        // var ref = firebase.database().ref().child("Text").set("OMGyyy").then(function(){
        //     this.emit(':tellWithCard',speechOutput, this.t('SKILL_NAME'), randomFact);
        // });
        var ref = firebase.database().ref().child("Text");
        ref.once('value').then((snapshot) => {
        //alexa.emit(':ask', "Works");
        this.emit(':tellWithCard',snapshot.val(), this.t('SKILL_NAME'), randomFact);
        },
        (err) => {
           this.emit(':tellWithCard',snapshot.val(), this.t('SKILL_NAME'), randomFact);
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

