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
