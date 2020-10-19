import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };

// const firebaseConfigTesting = {
//   apiKey: "AIzaSyCGH8mvlmfiXOyPZ7NVesm45qZTTAXPv74",
//   authDomain: "aparcar-e9786.firebaseapp.com",
//   databaseURL: "https://aparcar-e9786.firebaseio.com",
//   projectId: "aparcar-e9786",
//   storageBucket: "aparcar-e9786.appspot.com",
//   messagingSenderId: "481724039324",
//   appId: "1:481724039324:web:57b3de730562f14bd5ad59"
// };

// if ( process.env.NODE_ENV === 'test') {
//   firebase.initializeApp(firebaseConfigTesting);
// } else {
// }

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); //base de datos
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); //para poder usar el login

export {
    db,
    googleAuthProvider,
    firebase
}