// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyBge7INCaZhBfCUkftbwE9VJ2fXWgkD0-Y",
    authDomain: "psi-project-d985e.firebaseapp.com",
    projectId: "psi-project-d985e",
    storageBucket: "psi-project-d985e.appspot.com",
    messagingSenderId: "513435252250",
    appId: "1:513435252250:web:28e2cab2b98c1b11ac03a3",
    measurementId: "G-Z32W7R1FHC"
  };
  
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db }; // auth と db をエクスポート
