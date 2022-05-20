import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDT11KufRPTHFC1YW81QkmLqfAIFw8_EL8",
  authDomain: "instagram-clone-abf64.firebaseapp.com",
  databaseURL: "https://instagram-clone-abf64-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-abf64",
  storageBucket: "instagram-clone-abf64.appspot.com",
  messagingSenderId: "263240906593",
  appId: "1:263240906593:web:3d82f3d75215450ba73720",
  measurementId: "G-KZBD7LWKLD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {db, auth};