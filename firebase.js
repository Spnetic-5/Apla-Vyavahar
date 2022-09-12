import * as firebase from 'firebase'

import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCD9YHBPVvTWUAMF6I1S7B47C709t_M69c",
  authDomain: "csgo-d804e.firebaseapp.com",
  projectId: "csgo-d804e",
  storageBucket: "csgo-d804e.appspot.com",
  messagingSenderId: "1076916350226",
  appId: "1:1076916350226:web:a4f01f11e21da98a1a97cb",
  measurementId: "G-8XY0LJW7N2"
};

let app
if ((firebase.apps.length === 0)) {
  app = firebase.initializeApp(firebaseConfig)
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = app.firestore()

export {auth, db}

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCD9YHBPVvTWUAMF6I1S7B47C709t_M69c",
//   authDomain: "csgo-d804e.firebaseapp.com",
//   projectId: "csgo-d804e",
//   storageBucket: "csgo-d804e.appspot.com",
//   messagingSenderId: "1076916350226",
//   appId: "1:1076916350226:web:a4f01f11e21da98a1a97cb",
//   measurementId: "G-8XY0LJW7N2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);