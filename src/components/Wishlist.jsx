import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeCard from "./HomeCard";
import Navbar from "./Navbar";
import { BsToggle2Off } from "react-icons/bs";
import { BsToggle2On } from "react-icons/bs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { loginSuccess } from "../Redux/userSlice";

function Wishlist() {
  const { currentUser } = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  const [wish, setWishlist] = useState([]);
  const dispatch = useDispatch();

  // console.log(currentUser);

  useEffect(() => {
    const fetchWish = async () => {
      const colRef = collection(db, "users");
      const emailToFind = currentUser.email;
      const q = query(colRef, where("email", "==", emailToFind));
      const getSnapshotId = await getDocs(q);

      if (!getSnapshotId.empty) {
        getSnapshotId.forEach((doc) => {
          console.log(doc.data());
          setWishlist(doc.data().wishlist);
          dispatch(loginSuccess(doc.data()));
        });
      } else {
        console.log("No documents found with the specified email.");
      }
    };
    fetchWish();
  }, []);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div className="min-h-screen bg-slate-400 ">
      <Navbar wish={true} />
      <h1 className="my-4 text-xl md:text-3xl font-bold">Your Wishlist</h1>
      <div className="hidden md:flex gap-2 absolute right-10 top-20 cursor-pointer ">
        <span>Change View</span>{" "}
        <span>
          {toggle ? (
            <BsToggle2On size={"25px"} onClick={handleToggle} />
          ) : (
            <BsToggle2Off size={"25px"} onClick={handleToggle} />
          )}{" "}
        </span>
      </div>
      <div className="flex flex-col items-center md:flex-row justify-center flex-wrap">
        {wish.map((data) => {
          return <HomeCard toggle={toggle} data={data} />;
        })}

        {wish.length == 0 ? (
          <div className="my-10">No Articles in your wishlist !</div>
        ) : null}
      </div>
    </div>
  );
}

export default Wishlist;
