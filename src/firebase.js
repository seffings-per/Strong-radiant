import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtakMikxMjoPCjpbLmCdD1pGKKslLDdNE",
  authDomain: "strong-radiant.firebaseapp.com",
  projectId: "strong-radiant",
  storageBucket: "strong-radiant.firebasestorage.app",
  messagingSenderId: "640982873385",
  appId: "1:640982873385:web:c0c0479da030869b537338"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
