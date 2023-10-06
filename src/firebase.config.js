// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5HWH9IzTxVW7MXQtj9vQ30gypkP6BUJA",
    authDomain: "house-marketplace-app-adb6e.firebaseapp.com",
    projectId: "house-marketplace-app-adb6e",
    storageBucket: "house-marketplace-app-adb6e.appspot.com",
    messagingSenderId: "1082402901316",
    appId: "1:1082402901316:web:e6c11b858e91ea22b89b11"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();