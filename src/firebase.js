// import { initializeApp } from "firebase/app"
// import { getAuth } from "firebase/auth"
// import "firebase/firestore"
// import {} from "firebase/storage"
// import { getFirestore, collection } from "firebase/firestore"
// import { getStorage } from "firebase/storage"

// const app = initializeApp({
//   apiKey: "AIzaSyDMPbNCc6EU8QMeOcucoCdE18D_Hrph0bg",
//   authDomain: "file-management-6864b.firebaseapp.com",
//   databaseURL: "https://file-management-6864b-default-rtdb.firebaseio.com/",
//   projectId: "file-management-6864b",
//   storageBucket: "file-management-6864b.appspot.com",
//   messagingSenderId: "289052544466",
//   appId: "1:289052544466:web:8c5ef05d3fd2a3277a0c0b",
//   measurementId: "G-F6SYK1006J"
// })


// export const database = getFirestore(app)
// export const database = {
//   folders: collection("folders"),
//   files: collection("files"),
//   formatDoc: doc => {
//     return { id: doc.id, ...doc.data() }
//   },
//   getCurrentTimestamp: new Date(),
// }
// export const storage = getStorage(app)
// export const auth = getAuth(app)
// export default app

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6859DuhyhBrHlZZl9zqY8TZKiqlB1vkI",
  authDomain: "file-management-73e4d.firebaseapp.com",
  projectId: "file-management-73e4d",
  storageBucket: "file-management-73e4d.appspot.com",
  messagingSenderId: "984701571106",
  appId: "1:984701571106:web:b7a1f0a95a65c9cda3ba7b",
  measurementId: "G-R1E9CF7K73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, database, storage, ref, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged };  