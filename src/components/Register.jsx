import React, { useContext } from "react";
import { auth, db, provider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import bg from "../images/bg.jpg";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/userSlice";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: (values) => {
      let error = {};

      if (!values.email) {
        error.email = "email cannot be empty";
      }
      if (!values.password) {
        error.password = "Password cannot be empty";
      }
      if (!values.name) {
        error.name = "name cannot be empty";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        console.log(values);

        const colRef = collection(db, "users");
        const emailToFind = values.email;
        const q = query(colRef, where("email", "==", emailToFind));
        const getSnapshotId = await getDocs(q);

        if (!getSnapshotId.empty) {
          getSnapshotId.forEach((doc) => {
            console.log(`${JSON.stringify(doc.data())}`);

            alert("email already registered, kindly login to continue");
          });
        } else {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          console.log("Registration successful", userCredential.user);
          const colRef = collection(db, "users");
          values.wishlist = [];
          delete values.password;
          const addSnapshot = await addDoc(colRef, values);
          console.log(addSnapshot.id);
        }
        formik.resetForm();
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleSignin = () => {
    navigate("/");
  };

  return (
    <div
      className={`login bg-cover bg-center  h-screen w-screen flex items-center justify-center bgCustom text-center`}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="login-container p-5 border border-solid border-gray-200 rounded-lg text-center shadow-lg bg-white fontTimes italic h-fit py-4 md:py-5 flex flex-col justify-between md:justify-evenly gap-3">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Sign up to News App
        </h1>
        <form
          className="flex flex-col gap-4 my-4 h-full"
          onSubmit={formik.handleSubmit}
        >
          <input
            type="text"
            placeholder="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            className="border px-2"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            className="border px-2"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            className="border px-2"
          />
          <button
            type="submit"
            className="bg-gray-600 text-white border-none p-2 rounded-lg"
          >
            Sign Up
          </button>
        </form>
        <div className="textColor my-2">
          Already have a account.{" "}
          <span
            onClick={() => {
              handleSignin();
            }}
            className="cursor-pointer underline"
          >
            {" "}
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
}
//
//
export default Signup;
