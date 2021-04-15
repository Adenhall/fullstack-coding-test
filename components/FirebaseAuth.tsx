import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import env from '.env'

let app: firebase.app.App;

if (!firebase.apps.length) {
  app = firebase.initializeApp({
    apiKey: env.firebaseApiKey,
    authDomain: env.firebaseAuthDomain,
    projectId: env.firebaseProjectId,
    storageBucket: env.firebaseStorageBucket,
    messagingSenderId: env.firebaseMessagingSenderId,
    appId: env.firebaseAppId,
    measurementId: env.firebaseMeasurementID,
  });
} else {
  app = firebase.app();
}

export const auth = app.auth();
export const db = app.firestore()
export default app;
