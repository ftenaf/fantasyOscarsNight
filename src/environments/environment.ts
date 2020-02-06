// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const functions = require('firebase-functions');

const firebaseConfig = {
  apiKey: functions.config().api.key,
  authDomain: "oscarsfantasynight.firebaseapp.com",
  databaseURL: "https://oscarsfantasynight.firebaseio.com",
  projectId: "oscarsfantasynight",
  storageBucket: "oscarsfantasynight.appspot.com",
  messagingSenderId: functions.config().messaging.senderid,
  appId: functions.config().app.id
};

export const environment = {
  production: false,
  movieDbKey: functions.config().moviedb.key,
  movieDbUrl: 'https://api.themoviedb.org/3',
  poster_url_prefix: 'https://image.tmdb.org/t/p/w300/',
  firebase: firebaseConfig, 
  countryApiURL: "https://restcountries.eu/rest/v2/alpha/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
