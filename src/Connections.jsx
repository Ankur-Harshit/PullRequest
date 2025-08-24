import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "./utils/connectionSlice";
import Shimmer from "./components/Shimmer";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {}
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <div><Shimmer /></div>;

  if (connections.length === 0)
    return (
      <h1 className="text-center mt-20 text-2xl font-semibold text-gray-500">
        No connections found
      </h1>
    );

  return (
  <div className="w-full min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-black pt-12 px-6 pb-40">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-16 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
      ⚡ Your Connections
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
      {connections.map((connection, index) => {
        const { _id, firstName, lastName, age, photoUrl, about, gender } = connection;
        return (
          <div
            key={_id}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-lg overflow-hidden 
                       transform transition-all duration-300 hover:-translate-y-3 hover:scale-101 
                       hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]"
          >
            {/* Profile Image */}
            <div className="relative">
              <img
                alt="profile"
                src={photoUrl}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-3 right-3 bg-black/70 p-2 rounded-full text-lg text-pink-400 shadow-md">
                💖
              </div>
            </div>

            {/* Info Section */}
            <div className="p-5 flex flex-col gap-3">
              <h2 className="text-xl font-bold text-white leading-tight tracking-wide">
                {firstName} {lastName},{" "}
                <span className="text-pink-400">{age}</span>
              </h2>
              <p className="text-sm text-gray-400 uppercase tracking-wider">
                {gender}
              </p>
              <p className="text-sm italic text-gray-300 line-clamp-3">
                “{about || "No bio yet"}”
              </p>

              <Link to={"/chat/"+_id}><button className="mt-4 bg-gradient-to-r from-black to-indigo-500 
                                 text-white py-2 px-5 text-sm font-semibold 
                                 hover:opacity-90 transition-all shadow-md 
                                 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                💬 Message
              </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

};

export default Connections;
