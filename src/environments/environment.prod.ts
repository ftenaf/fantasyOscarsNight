const firebaseConfig = {
  apiKey: "AIzaSyD7df5hGA33oC3LBbIKcTiJg3GSqnaySns",
  authDomain: "oscarsfantasynight.firebaseapp.com",
  databaseURL: "https://oscarsfantasynight.firebaseio.com",
  projectId: "oscarsfantasynight",
  storageBucket: "oscarsfantasynight.appspot.com",
  messagingSenderId: "913293815216",
  appId: "1:913293815216:web:c214e5ec6d99b293a27a75"
};

export const environment = {
  production: false,
  movieDbUrl: 'https://api.themoviedb.org/3',
  poster_url_prefix: 'https://image.tmdb.org/t/p/w300/',
  firebase: firebaseConfig, 
  countryApiURL: "https://restcountries.eu/rest/v2/alpha/"
};
