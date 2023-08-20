import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setVideo } from "../Redux/articleSlice";

function HomeCard({ toggle, data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavtoview = () => {
    dispatch(setVideo(data));
    navigate(`/viewnews`);
  };
  return (
    <div
      className={`w-11/12 h-80 overflow-hidden  ${
        toggle ? "md:w-1/4 md:h-80 overflow-hidden" : "md:w-5/12"
      } p-4 h-fit border border-solid mx-2 my-5 cursor-pointer flex flex-col `}
      onClick={handleNavtoview}
    >
      <img
        className={`h-48  w-full object-cover`}
        src={data.urlToImage}
        alt=""
      />
      <div className={` font-bold  ${toggle ? " text-sm" : ""}`}>
        {data.title}
      </div>
    </div>
  );
}

export default HomeCard;
