import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCKFGvQTwWeb7ACt0JfMbZJKpLBoz6VSpw",
    authDomain: "disneyplus-clone-dad2a.firebaseapp.com",
    projectId: "disneyplus-clone-dad2a",
    storageBucket: "disneyplus-clone-dad2a.appspot.com",
    messagingSenderId: "727519291410",
    appId: "1:727519291410:web:26ef6f9dc777d2edc710cb",
    measurementId: "G-ZTGL6G3MD5"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const provider = new GoogleAuthProvider();
  const storage = getStorage();

  export {auth,provider,storage};
  export default db;