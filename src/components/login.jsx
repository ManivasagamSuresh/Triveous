import React, { useContext } from "react";
import { auth, db, provider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import bg from "../images/bg.jpg"
import { FcGoogle } from 'react-icons/fc';
import { Await, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/userSlice";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signIn = async () => {
    try {
      let result = await signInWithPopup(auth, provider);
     
      console.log(result.user.email,result.user.displayName);

      const colRef = collection(db, "users");
          const emailToFind = result.user.email;
        const q = query(colRef, where ("email", "==", emailToFind));
        const getSnapshotId = await getDocs(q);
        if (!getSnapshotId.empty) {
          getSnapshotId.forEach(async(doc) => {
            // console.log(doc.data());
           dispatch(loginSuccess(doc.data()))
            navigate("/home") ; 
          })     
    } 
     
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues:{
        "email":"",
        "password":""
    },
    validate:(values)=>{
        let error = {};

        if(!values.email){
            error.email = "email cannot be empty"
        }
        if(!values.password){
            error.password = "Password cannot be empty"
        }   
             return error;
    },
    onSubmit:async(values)=>{

      try {
        // console.log( values.email, values.password);
        // loging In
          const login  = await signInWithEmailAndPassword(auth, values.email, values.password);
          const colRef = collection(db, "users");
          const emailToFind = values.email;
        const q = query(colRef, where ("email", "==", emailToFind));
        const getSnapshotId = await getDocs(q);
        if (!getSnapshotId.empty) {
          getSnapshotId.forEach(async(doc) => {
            // console.log(doc.data());
           dispatch(loginSuccess(doc.data()))
            navigate("/home") ; 
          })     
    } 


        formik.resetForm()
      } catch (error) {
        alert(error.message)
        console.log(error)
      }
       
    }
  })
  
const handleSignup = ()=>{
  navigate("/signup")
}

  return (
    <div className={`login bg-cover bg-center  h-screen w-screen flex items-center justify-center bgCustom text-center`} style={{ backgroundImage: `url(${bg})` }}>
      <div className="login-container p-5 border border-solid border-gray-200 rounded-lg text-center shadow-lg bg-white fontTimes italic h-fit   flex flex-col justify-between md:justify-evenly gap-3">
          
      <h1 className="text-2xl md:text-3xl font-semibold">Sign in to News App</h1>
          <form className="flex flex-col gap-4 my-4 h-full" onSubmit={formik.handleSubmit}> 
         
          <input type="email"  placeholder="Email" onChange={formik.handleChange} value={formik.values.email} name="email" className="border px-2"/>
          <input type="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} name="password" className="border px-2"/>
          <button type="submit" className="bg-gray-600 text-white border-none p-2 rounded-lg">Sign In</button>
          </form>
          <div  className="textColor my-2" >Don't have an account?. <span onClick={handleSignup} className="cursor-pointer underline">Sign Up</span></div>
        <button onClick={signIn} className="flex items-center justify-center gap-3 p-2 border border-solid border-gray-900 rounded-lg cursor-pointer">Sign in with Google <FcGoogle/></button>
      </div>
    </div>
  );
}
//
//
export default Login;
