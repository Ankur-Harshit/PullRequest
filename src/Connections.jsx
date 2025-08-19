import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "./utils/connectionSlice";
import Shimmer from "./components/Shimmer";

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
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-12 px-4 pb-40">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-14 text-pink-500 drop-shadow-md tracking-tight">
        ❤️ Your Connections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {connections.map((connection, index) => {
          const { firstName, lastName, age, photoUrl, about, gender } = connection;
          return (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:-translate-y-3 hover:scale-105 hover:shadow-pink-500/30"
            >
              {/* Image */}
              <div className="relative">
                <img
                  alt="profile"
                  src={photoUrl}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/60 p-2 rounded-full text-lg text-pink-400 shadow-sm">
                  💖
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col gap-3">
                <h2 className="text-xl font-bold text-white leading-tight">
                  {firstName} {lastName}, <span className="text-pink-400">{age}</span>
                </h2>
                <p className="text-sm text-gray-400 capitalize">{gender}</p>
                <p className="text-sm italic text-gray-300 line-clamp-3">
                  “{about || "No bio yet"}”
                </p>

                <button className="mt-4 bg-gradient-to-r from-pink-600 to-rose-500 text-white py-2 px-4 rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-md hover:shadow-pink-500/40">
                  💬 Message
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
