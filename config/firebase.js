import { initializeApp, firebase } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref as sRef } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAEIWvvXp3Bd-qDY5Z_9K105969_WDEp_Y",
  authDomain: "vqode-next-auth.firebaseapp.com",
  projectId: "vqode-next-auth",
  storageBucket: "vqode-next-auth.appspot.com",
  messagingSenderId: "233522909929",
  databaseURL:"https://vqode-next-auth-default-rtdb.firebaseio.com/",
  appId: "1:233522909929:web:c40500cb11ae570b4f9678"
};

const app = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const secondaryStorage = getStorage(secondaryApp);

export default app;

export const auth = getAuth()