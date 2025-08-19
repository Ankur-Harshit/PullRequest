import axios from "axios";
import React from "react";
import { useSwipeable } from "react-swipeable";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "./utils/feedSlice";

const UserCard = ({ user }) => {
  const {_id, firstName, lastName, age, photoUrl, about, gender } = user;
  const dispatch = useDispatch();

  const handleInterested = async () => {
    try{
      const res = axios.post(BASE_URL+"/request/send/interested/"+_id, {}, {
        withCredentials: true,
      });
      dispatch(removeFeed(_id));
    }
    catch(err){
      console.log(err);
    }

  };

  const handleIgnore = async () => {
    try{
      const res = axios.post(BASE_URL+"/request/send/ignored/"+_id, {}, {
        withCredentials: true,
      });
      dispatch(removeFeed(_id));
    }
    catch(err){
      console.log(err);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleIgnore(),
    onSwipedRight: () => handleInterested(),
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  });

  

  return (
    <div
      {...handlers}
      className="w-full max-w-xs bg-white/10 backdrop-blur-md text-white rounded-2xl overflow-hidden shadow-xl transform transition duration-300 hover:scale-105"
    >
      <figure className="h-80 w-full overflow-hidden">
        <img
          src={photoUrl}
          alt="Profile Pic"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="p-5 flex flex-col gap-2">
        <h2 className="text-xl font-semibold">
          {firstName} {lastName}
        </h2>
        <p className="text-pink-300 text-sm font-medium">
          {age} · {gender}
        </p>
        <p className="text-gray-200 text-sm italic">
          {about || "No bio provided."}
        </p>

        <div className="flex justify-around mt-4">
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-4 py-2 rounded-full shadow transition"
            onClick={handleInterested}
          >
            Interested
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-4 py-2 rounded-full shadow transition"
            onClick={handleIgnore}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
