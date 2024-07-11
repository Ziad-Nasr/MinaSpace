// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAm3gkQI4fB4M1z5_p6NEznfp4qZ3mrv90",
  authDomain: "minaspace-12345.firebaseapp.com",
  projectId: "minaspace-12345",
  storageBucket: "minaspace-12345.appspot.com",
  messagingSenderId: "1063593698250",
  appId: "1:1063593698250:web:05cfca7564197399312533",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
