import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDijI6oMfUL5W5Ns8cXah5-FuSXkPjnv0w",
  authDomain: "oneobuildcon-3d7a0.firebaseapp.com",
  projectId: "oneobuildcon-3d7a0",
  storageBucket: "oneobuildcon-3d7a0.firebasestorage.app",
  messagingSenderId: "150454791386",
  appId: "1:150454791386:web:df874a16e6959897b589e3",
  measurementId: "G-JN688QL6H9",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
