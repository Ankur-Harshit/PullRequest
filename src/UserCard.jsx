import axios from "axios";
import React from "react";
import { useSwipeable } from "react-swipeable";
import { BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "./utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, photoUrl, about, gender } = user;
  const dispatch = useDispatch();

  const handleInterested = async () => {
    try {
      await axios.post(BASE_URL + "/request/send/interested/" + _id, {}, { withCredentials: true });
      dispatch(removeFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleIgnore = async () => {
    try {
      await axios.post(BASE_URL + "/request/send/ignored/" + _id, {}, { withCredentials: true });
      dispatch(removeFeed(_id));
    } catch (err) {
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
      className="w-[280px] sm:w-[320px] bg-[#1a1a1d]/90 backdrop-blur-md text-white rounded-xl overflow-hidden shadow-2xl transform transition duration-300 hover:scale-105 border border-gray-800"
    >
      <figure className="h-64 w-full overflow-hidden">
        <img
          src={photoUrl}
          alt="Profile Pic"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold">
          {firstName} {lastName}
        </h2>
        <p className="text-pink-400 text-xs font-medium">
          {age} · {gender}
        </p>
        <p className="text-gray-300 text-sm italic line-clamp-3">
          {about || "No bio provided."}
        </p>

        <div className="flex justify-around mt-3">
          <button
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-3 py-1.5 rounded-full shadow transition text-sm"
            onClick={handleInterested}
          >
            Interested
          </button>
          <button
            className="bg-gray-800 hover:bg-gray-900 text-white font-semibold px-3 py-1.5 rounded-full shadow transition text-sm"
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
