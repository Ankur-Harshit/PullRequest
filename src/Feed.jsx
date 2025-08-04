import axios from "axios";
import { addFeed } from "./utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./utils/constants";
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store)=>store.feed);
  const dispatch = useDispatch();

  const getFeed = async ()=> {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL + "/feed" , {withCredentials: true,});
      dispatch(addFeed(res?.data?.data));
    }
    catch(err){
      // Need to make error page
    }
  }

  useEffect(()=>{
    getFeed();
  }, []);
  // Add Shimmer UI
  return (
    feed && (<div className="flex justify-center m-4">
      <UserCard user={feed[0]} />
    </div>)
  )
}

export default Feed
