
import { initializeApp, getApps, getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBpkRC3hJfXLBC3a31HDLDViTfAA_pW5Tc",
  authDomain: "fir-tut-a7550.firebaseapp.com",
  projectId: "fir-tut-a7550",
  storageBucket: "fir-tut-a7550.appspot.com",
  messagingSenderId: "937330763704",
  appId: "1:937330763704:web:09041bbb1cf1fab5a3514d"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()
const storage = getStorage()

export {app, db, storage}