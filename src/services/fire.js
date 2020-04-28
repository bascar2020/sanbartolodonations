
import app from 'firebase/app';
import  'firebase/auth'
import  'firebase/database'
import {key} from '../keys';


const config = {
    apiKey: key.apiKey,
    authDomain: key.authDomain,
    databaseURL: key.databaseURL,
    projectId: key.projectId,
    storageBucket: key.storageBucket,
    messagingSenderId: key.messagingSenderId,
    appId: key.appId,
    measurementId: key.measurementIdy
  };
  
  app.initializeApp(config);

  export const auth = app.auth();
  export const db = app.database();