import app from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyD5jNV91VQIXt5xzwL3vBN7Kpc_3HpxXHc",
    authDomain: "login1-be818.firebaseapp.com",
    projectId: "login1-be818",
    storageBucket: "login1-be818.appspot.com",
    messagingSenderId: "482652932277",
    appId: "1:482652932277:web:5af0636a83304d0fbe16fc"
  };
  
  // Initialize Firebase
  app.initializeApp(firebaseConfig);

  const db = app.firestore()
  const auth = app.auth()
  export {db,auth}