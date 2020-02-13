import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import {
  CallableContext
} from 'firebase-functions/lib/providers/https';
/*
import {
  OscarsResponse,
  NomineesEnum,
  Nominee
} from './oscars.model';

const fetch = require("node-fetch");
*/
admin.initializeApp(functions.config().firebase);


export const tmdb_api_key = functions.region("europe-west1").https.onCall((data: any, context: CallableContext) => {
  //setCorsHeaders(request, response);
  //respondSuccess(functions.config().moviedb.key, response);
  return {
    tmdb_api_key: functions.config().moviedb.key
  };
});

export const proxy_api_url = functions.region("europe-west1").https.onCall((data: any, context: CallableContext) => {
  return {
    proxy_api_url: functions.config().proxy_api.url
  };
});
/*
function areEqual(obj1: any, obj2: any): boolean {
  if (obj1 !== null) {
    return Object.keys(obj1).every(key => {
      return obj2.hasOwnProperty(key) ?
        typeof obj1[key] === 'object' ?
        areEqual(obj1[key], obj2[key]) :
        obj1[key] === obj2[key] :
        false;
    })
  } else {
    return (obj1 === null && obj2 === null);
  }
}

function getNomineesAcademy() {
  const url = "https://d37lefl1k5vay2.cloudfront.net/api/1.0/pages/nominees/2020";
  // const url2 = proxy_api_url + url;
  return fetch(url)
    .catch((err: any) => {
      console.error(err);
    });
}

async function setNominees(oscarResponse: OscarsResponse) {
  for (const n in oscarResponse.data.sections.nominees) {
    try {
      const key = n as NomineesEnum;
      const nomineeDoc = admin.firestore().collection('nominees').doc(n);
      const nominee = (await nomineeDoc.get()).data() as Nominee;
      const newNominee = oscarResponse.data.sections.nominees[key];
      if (!areEqual(nominee, newNominee)) {
        await nomineeDoc.set(newNominee, {
          merge: true
        }).then(x => {
          if (newNominee.result){
            newNominee.result.forEach(element => {
              if (element.winner){
                const title = 'And the '+ newNominee.category_name +' Oscar goes to...'+ element.post_title;
                const message = {
                  notification: {
                    title: title,
                    body: ''
                  },
                  token: 'temptoken'
                };

                admin.messaging().send(message)
                  .then((response: any) => {
                    console.log('Successfully sent message:', response);
                  })
                  .catch((error: any) => {
                    console.log('Error sending message:', error);
                  });
              }
            });
          }
          console.log("guardado: " + x.writeTime);
        }).catch(reason => {
          console.error(reason);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export const autoUpdateNominees = functions.region("europe-west1").pubsub.schedule('every 1200 minutes').onRun((context) => {
  console.log('searching for changes in the Academy');
  admin.firestore().collection("nominees").get().then(snapshot => {
    getNomineesAcademy()
      .then((response: any) => response.json())
      .then(async (oscarsResponse: any) => {
        if (!areEqual(oscarsResponse, snapshot)) {
          const message = {
            notification: {
              title: 'Noticias de la academia',
              body: ''
            },
            token: 'temptoken'
          };

          admin.messaging().send(message)
            .then((response: any) => {
              console.log('Successfully sent message:', response);
            })
            .catch((error: any) => {
              console.log('Error sending message:', error);
            });
          await setNominees(oscarsResponse);
        }
      });
    return "";
  }).catch(reason => {
    console.error(reason);
  })
  return null;
});


// import * as importer from './import';
// import * as serviceAccount from '../serviceAccount.json';
// const https = require('https');
//const info = functions.config().info;
/*

exports.cronHandler = functions.pubsub.topic('minutely-tick').onPublish((event) => {
    return new Promise((resolve, reject) => {
        const hostname = info.hostname;
        const pathname = info.pathname;
        let data = '';
        const request = https.get(`https://${hostname}${pathname}`, (res) => {
            res.on('data', (d) => {
                data += d;
            });
            res.on('end', resolve);
        });
        request.on('error', reject);
    });
});
*/
/*
const ALLOWED_ORIGINS = ["http://localhost", "https://us-central1-oscarsfantasynight.cloudfunctions.net/*", "https://oscarsfantasynight.firebaseapp.com/"]


function setCorsHeaders (req: any, res: any) {
  var originUrl = "http://localhost"


  if(ALLOWED_ORIGINS.includes(req.headers.origin)){
    originUrl = req.headers.origin
  }

  res.set('Access-Control-Allow-Origin', originUrl);
  res.set('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET,POST','PUT','DELETE');
    res.set('Access-Control-Allow-Headers', 'Bearer, Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
  }
}

function respondError (message: any, error: any, code: any, res: any) {
  var response = {
    message: message,
    error: error
  }
  res.status(code).end(JSON.stringify(response));
}


function respondSuccess (result: any, res: any) {
  var response = {
    message: "OK",
    result: result
  }
  res.status(200).end(JSON.stringify(response));
}
*/
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
/*
export const tmdbReq = functions.region("europe-west1").https.onCall((data: any, ctx:  CallableContext) => {
  let url = "";
  const rs =   async url => {
    try{
      const response = await request({
        url: url
      });
      return response;
    }catch(error){
      console.error(error);
      return null;
    }
  }
  return rs(url);
});
*/

/*
export const importNominees = functions.region("europe-west1").https.onCall((data: any, context: CallableContext) => {
  try {
    console.log('Initialzing Firebase');
    importer.initializeApp(serviceAccount, "https://oscarsfantasynight.firebaseio.com");
    console.log('Firebase Initialized');
    importer.restore(data);
    console.log('Upload Success');
    return {
      msg: 'Upload Success',
      success: true
    };
  } catch (error) {
    console.log(error);
    return {
      msg: 'Upload Error',
      success: false
    };
  }
});
*/