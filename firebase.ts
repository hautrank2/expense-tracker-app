// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnFPk8ojlqxeqg-xdz2rVMQodooLNtZNE",
  authDomain: "expense-app-26727.firebaseapp.com",
  databaseURL:
    "https://expense-app-26727-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expense-app-26727",
  storageBucket: "expense-app-26727.firebasestorage.app",
  messagingSenderId: "1019074735843",
  appId: "1:1019074735843:web:bf1c3c04320cf16ceb1fd6",
  measurementId: "G-Q49XRW7GLM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
