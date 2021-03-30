import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

let app: firebase.app.App;

if (!firebase.apps.length) {
  app = firebase.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY || 'AIzaSyCXUz3YNsAXIeMMc-rO9dZ4rpkQG5ZL7B0',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || 'full-stack-test-e19ce.firebaseapp.com',
    projectId: process.env.FIREBASE_PROJECT_ID || 'full-stack-test-e19ce',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || 'full-stack-test-e19ce.appspot.com',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '986150254139',
    appId: process.env.FIREBASE_APP_ID || '1:986150254139:web:773d9509ac9336c1610e1e',
    measurementId: process.env.FIREBASE_MEASUREMENT_ID || 'G-QZW1JNHND8',
  });
} else {
  app = firebase.app();
}

export const auth = app.auth();
export const db = app.firestore()
export default app;
