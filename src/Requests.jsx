import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from './utils/constants';
import { addRequest, removeRequest } from './utils/requestSlice';
import { removeConnection } from './utils/connectionSlice';
import Shimmer from './components/Shimmer';
import Toast from './components/Toast';

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState();

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
      setShowToast(true);
      setToastMessage(status);
      setTimeout(()=>{
        setShowToast(false);
      },4000);
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
  <div className="w-full min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#000000] px-4 pt-12 pb-32">
    <div className="fixed top-5 z-50">
      {showToast && <Toast message={"Connection Request "+toastMessage}/>}
    </div>
    <h1 className="text-4xl sm:text-2xl font-bold text-center mb-16 tracking-tight 
                   bg-clip-text text-transparent bg-gradient-to-r from-blue-400  to-white 
                   ">
      Requests Received
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
      {request.map((req, index) => {
        const { firstName, lastName, age, photoUrl, about, gender } = req.fromUserId;

        return (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-xl border border-white/10 
                       rounded-2xl shadow-lg overflow-hidden w-full max-w-[320px] 
                       transform transition-all duration-300 
                       hover:-translate-y-3 hover:scale-101 
                       hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]"
          >
            {/* Profile Image */}
            <div className="relative">
              <img
                alt="profile"
                src={photoUrl}
                className="w-full h-64 object-cover"
              />
            </div>

            {/* Info Section */}
            <div className="p-5 flex flex-col gap-3 text-white">
              <h2 className="text-lg sm:text-xl font-bold leading-tight">
                {firstName} {lastName},{" "}
                <span className="text-pink-400">{age}</span>
              </h2>
              <p className="text-sm text-gray-400 capitalize">{gender}</p>
              <p className="text-sm italic text-gray-300 line-clamp-3">
                “{about || "No bio yet"}”
              </p>

              {/* Action Buttons */}
              <div className="mt-5 flex justify-between gap-3">
                <button
                  className="w-1/2 py-2 rounded-full text-sm font-semibold transition 
                             bg-gradient-to-r from-green-500 to-emerald-600 
                             hover:from-green-400 hover:to-emerald-500 
                             shadow-md hover:shadow-green-500/40"
                  onClick={() => reviewRequest("accepted", req._id)}
                >
                  ✅ Accept
                </button>
                <button
                  className="w-1/2 py-2 rounded-full text-sm font-semibold transition 
                             bg-gradient-to-r from-red-500 to-rose-600 
                             hover:from-red-400 hover:to-rose-500 
                             shadow-md hover:shadow-red-500/40"
                  onClick={() => reviewRequest("rejected", req._id)}
                >
                  ❌ Reject
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
