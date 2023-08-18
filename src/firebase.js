
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { collection, getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDsPgEQHzOFS_iQlzM25izG44Hk2l-3yyI",
    authDomain: "triveous-cf377.firebaseapp.com",
    projectId: "triveous-cf377",
    storageBucket: "triveous-cf377.appspot.com",
    messagingSenderId: "860361235288",
    appId: "1:860361235288:web:3ad102c2ed650c6d4c232d"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 


const auth = getAuth();
  const provider = new GoogleAuthProvider();

  export {app,auth,provider, db};


