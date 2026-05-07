import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "desizapp-food-delivery-af42a.firebaseapp.com",
  projectId: "desizapp-food-delivery-af42a",
  storageBucket: "desizapp-food-delivery-af42a.firebasestorage.app",
  messagingSenderId: "1074634438886",
  appId: "1:1074634438886:web:7c3730a42a104430eb6327"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {app, auth}