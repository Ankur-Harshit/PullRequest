import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from './utils/constants';
import { addRequest, removeRequest } from './utils/requestSlice';
import { removeConnection } from './utils/connectionSlice';
import Shimmer from './components/Shimmer';

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {}
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!request) return <div><Shimmer /></div>;

  if (request.length === 0)
    return (
      <h1 className="text-center mt-20 text-2xl font-semibold text-gray-400">
        No requests found
      </h1>
    );

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 pt-10 pb-32">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-pink-400 drop-shadow tracking-tight">
        💌 Requests Received
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {request.map((req, index) => {
          const { firstName, lastName, age, photoUrl, about, gender } = req.fromUserId;

          return (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl w-full max-w-[320px]"
            >
              <div className="relative">
                <img
                  alt="profile"
                  src={photoUrl}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/10 text-white px-3 py-1 rounded-full shadow text-sm">
                  💖
                </div>
              </div>

              <div className="p-4 flex flex-col gap-2 text-white">
                <h2 className="text-lg sm:text-xl font-bold text-pink-300">
                  {firstName} {lastName}, <span className="text-pink-500">{age}</span>
                </h2>
                <p className="text-sm text-gray-300 capitalize">{gender}</p>
                <p className="text-sm italic text-gray-400 line-clamp-3">
                  “{about || "No bio yet"}”
                </p>

                <div className="mt-4 flex justify-between gap-2">
                  <button
                    className="w-1/2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-full text-sm font-semibold transition"
                    onClick={() => reviewRequest("accepted", req._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-full text-sm font-semibold transition"
                    onClick={() => reviewRequest("rejected", req._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
