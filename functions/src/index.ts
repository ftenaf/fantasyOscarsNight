import * as functions from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';
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
export const tmdbapikey = functions.region("europe-west1").https.onCall((data: any, context:  CallableContext) => {
  //setCorsHeaders(request, response);
  //respondSuccess(functions.config().moviedb.key, response);
   return functions.config().moviedb.key;
});
