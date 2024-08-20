import { initializeApp, getApp, getApps, } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "restaurant-7e739.firebaseapp.com",
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: "restaurant-7e739",
    storageBucket: "restaurant-7e739.appspot.com",
    messagingSenderId: "800286268351",
    appId: "1:800286268351:web:2ce0991b887dbb47a79f0a"
};

const app = getApps.length > 0 ? getApp() :  initializeApp(firebaseConfig);

const firestore = getFirestore(app)
const storage = getStorage(app)

export {app,firestore,storage}