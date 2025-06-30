import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtDp8LzV_VVDJTfjX9eqZxVPiDJcZV1M4",
  authDomain: "todo-app-c9ab1.firebaseapp.com",
  projectId: "todo-app-c9ab1",
  storageBucket: "todo-app-c9ab1.firebasestorage.app",
  messagingSenderId: "1042103814695",
  appId: "1:1042103814695:web:89d4e84e767632582c9c02"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
export { app, auth, db };