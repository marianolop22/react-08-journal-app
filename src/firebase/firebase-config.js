import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCjwkIHPZSj-PrdcneU4NFO0WcP2HGafRE",
    authDomain: "react-app-curso-4dd6e.firebaseapp.com",
    databaseURL: "https://react-app-curso-4dd6e.firebaseio.com",
    projectId: "react-app-curso-4dd6e",
    storageBucket: "react-app-curso-4dd6e.appspot.com",
    messagingSenderId: "196262279562",
    appId: "1:196262279562:web:3d05b346de6622c223f073"
  };
  // Initialize Firebase

firebase.initializeApp(firebaseConfig);


const db = firebase.firestore(); //base de datos
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); //para poder usar el login

export {
    db,
    googleAuthProvider,
    firebase
}