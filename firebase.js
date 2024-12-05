import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyCM850FVDwmOECpIXWE9uXY8oYrFzUkL58",
  authDomain: "project-one-6899f.firebaseapp.com",
  projectId: "project-one-6899f",
  storageBucket: "project-one-6899f.firebasestorage.app",
  messagingSenderId: "216440417642",
  appId: "1:216440417642:web:df0fc5943e8cc5416bc913"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();





export {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider, signOut,
  signInWithPopup,
  
}
