import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD-_RWQ2Mc5-TEfg6ol22SJ7BKQSLaP0IM",
  authDomain: "spa-task-manager.firebaseapp.com",
  projectId: "spa-task-manager",
  storageBucket: "spa-task-manager.appspot.com",
  messagingSenderId: "169309719805",
  appId: "1:169309719805:web:104a1ac2f1cdca64b78294",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
