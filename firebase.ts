// // Import the functions you need from the SDKs you need
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import { getAnalytics } from "firebase/analytics";
// import { initializeApp } from "firebase/app";
// import { getReactNativePersistence, initializeAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAnFPk8ojlqxeqg-xdz2rVMQodooLNtZNE",
//   authDomain: "expense-app-26727.firebaseapp.com",
//   databaseURL:
//     "https://expense-app-26727-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "expense-app-26727",
//   storageBucket: "expense-app-26727.firebasestorage.app",
//   messagingSenderId: "1019074735843",
//   appId: "1:1019074735843:web:bf1c3c04320cf16ceb1fd6",
//   measurementId: "G-Q49XRW7GLM",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnFPk8ojlqxeqg-xdz2rVMQodooLNtZNE",
  authDomain: "expense-app-26727.firebaseapp.com",
  databaseURL:
    "https://expense-app-26727-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "expense-app-26727",
  storageBucket: "expense-app-26727.firebasestorage.app",
  messagingSenderId: "1019074735843",
  appId: "1:1019074735843:web:bf1c3c04320cf16ceb1fd6",
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let authInstance;
try {
  authInstance = getAuth(app);
} catch {
  authInstance = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
}

export const auth = authInstance;
