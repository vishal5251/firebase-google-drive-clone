import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
// import "firebase/firestore"
// import {} from "firebase/storage"
import { getFirestore, collection } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const app = initializeApp({
  apiKey: "AIzaSyDMPbNCc6EU8QMeOcucoCdE18D_Hrph0bg",
  authDomain: "file-management-6864b.firebaseapp.com",
  databaseURL: "https://file-management-6864b-default-rtdb.firebaseio.com/",
  projectId: "file-management-6864b",
  storageBucket: "file-management-6864b.appspot.com",
  messagingSenderId: "289052544466",
  appId: "1:289052544466:web:8c5ef05d3fd2a3277a0c0b",
  measurementId: "G-F6SYK1006J"
})


export const database = getFirestore(app)
// export const database = {
//   folders: collection("folders"),
//   files: collection("files"),
//   formatDoc: doc => {
//     return { id: doc.id, ...doc.data() }
//   },
//   getCurrentTimestamp: new Date(),
// }
export const storage = getStorage(app)
export const auth = getAuth(app)
export default app
