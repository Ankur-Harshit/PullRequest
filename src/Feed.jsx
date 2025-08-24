import axios from "axios";
import { addFeed } from "./utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./utils/constants";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import Shimmer from "./components/Shimmer";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;

  const getFeed = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/feed?page=${page}&limit=${limit}`,
        { withCredentials: true }
      );
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      // TODO: add error page
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length <= 0)
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-screen bg-[#0a0a0f] text-white">
        <Shimmer />
        <button
          onClick={getFeed}
          className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-2xl shadow-lg transition-all duration-200"
        >
          Load More
        </button>
      </div>
    );

  return (
    feed && (
      <div className="h-screen w-full bg-gradient-to-br from-[#0d0d0f] via-[#1a1a2e] to-[#16213e] flex flex-col items-center justify-center px-4 relative">
        {/* Centered user card */}
        <div className="flex-grow flex items-center justify-center">
          <UserCard user={feed[0]} />
        </div>
      </div>
    )
  );
};

export default Feed;
