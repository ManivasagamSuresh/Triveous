
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { collection, getFirestore} from "firebase/firestore";
// import "firebase/firestore";

const REACT_APP_APIKEY = process.env.REACT_APP_APIKEY;
const REACT_APP_AUTHDOMAIN =  process.env.REACT_APP_REACT_APP_AUTHDOMAIN;
const REACT_APP_PROJECTID =  process.env.REACT_APP_REACT_APP_PROJECTID;
const REACT_APP_STORAGEBUCKET =  process.env.REACT_APP_REACT_APP_STORAGEBUCKET;
const REACT_APP_MSGSENDERID =  process.env.REACT_APP_REACT_APP_MSGSENDERID;
const REACT_APP_APPID =  process.env.REACT_APP_REACT_APP_APPID;

// const firebaseConfig = {
//   apiKey: REACT_APP_APIKEY,
//   authDomain: REACT_APP_AUTHDOMAIN,
//   projectId: REACT_APP_PROJECTID,
//   storageBucket: REACT_APP_STORAGEBUCKET,
//   messagingSenderId: REACT_APP_MSGSENDERID,
//   appId: REACT_APP_APPID
// };
const firebaseConfig = {
    apiKey: "AIzaSyDsPgEQHzOFS_iQlzM25izG44Hk2l-3yyI",
    authDomain: "triveous-cf377.firebaseapp.com",
    projectId: "triveous-cf377",
    storageBucket: "triveous-cf377.appspot.com",
    messagingSenderId: "860361235288",
    appId: "1:860361235288:web:3ad102c2ed650c6d4c232d"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Get Firestore instance from the app


const auth = getAuth();
  const provider = new GoogleAuthProvider();

  export {app,auth,provider, db};


