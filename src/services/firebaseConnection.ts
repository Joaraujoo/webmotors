
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaU0xatHZfLUZeyKxdT9acMifFKICm9wI",
  authDomain: "webcarros-1ed2d.firebaseapp.com",
  projectId: "webcarros-1ed2d",
  storageBucket: "webcarros-1ed2d.firebasestorage.app",
  messagingSenderId: "10206222078",
  appId: "1:10206222078:web:11485f93040a74088cf7af"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}