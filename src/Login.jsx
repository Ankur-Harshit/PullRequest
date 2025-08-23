import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BASE_URL } from "./utils/constants";

const Login = () => {
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const res = await axios.post(BASE_URL+"/login", {
                emailId,
                password,
            },
            {
                withCredentials: true,
            });
            dispatch(addUser(res.data));
            return navigate("/");
        }
        catch(err){
          setError(err?.response?.data);
          console.log(err);
        }
    }

  const [showPassword, setShowPassword] = useState(false);

return (
  <div className="min-h-screen w-full flex flex-col bg-black relative overflow-hidden">
    {/* Background */}
    <img
      src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1740&q=80"
      alt="background"
      className="absolute inset-0 w-full h-full object-cover opacity-80"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-0" />

    {/* Login Card */}
    <div className="relative z-10 flex-grow flex items-center justify-center pt-24 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-3xl shadow-2xl p-10 min-h-[500px]">
        <h1 className="text-4xl sm:text-5xl font-semibold font-serif text-pink-400 text-center tracking-wide mb-2 drop-shadow-md">
          PullRequest
        </h1>
        <p className="text-center text-gray-200 mb-6 text-sm sm:text-base">
          Log in to connect with developers 💻
        </p>

        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Email"
            className="px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 transform -translate-y-1/2 text-sm text-gray-300 cursor-pointer hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {error && (
            <div className="text-red-400 text-center text-sm font-medium">{error}</div>
          )}

          <button
            onClick={handleLogin}
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-full transition duration-300 shadow-lg"
          >
            Log In
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-300">
          Don’t have an account?{" "}
          <Link to="/signup"><span className="text-pink-400 underline cursor-pointer">Sign up</span></Link>
        </p>
      </div>
    </div>

    {/* Stories */}
    <div className="relative z-10 text-white pt-20 pb-16 px-4 sm:px-12">
      <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12 text-pink-400 drop-shadow-md">
        ❤️ Stories from Our Community
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {/* Story 1 */}
        <div className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-md backdrop-blur-md">
          <img
            src="https://tinder.com/static/build/a189cea6de5bea78ef0ecdc66fc520fe.webp"
            alt="Elena & Giulia"
            className="rounded-xl mb-4 w-full h-80 object-cover"
          />
          <h3 className="text-xl font-semibold mb-2">Elena & Giulia</h3>
          <p className="text-sm text-gray-200">
            "No sad bitches please, I'm a pure Italian soul" was Giulia's description...
            <span className="text-pink-400 underline ml-1 cursor-pointer">Continue reading ↗</span>
          </p>
        </div>

        {/* Story 2 */}
        <div className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-md backdrop-blur-md">
          <img
            src="https://tinder.com/static/build/79f8be21e26719ac973f5a6f6b16b95f.webp"
            alt="Amanda & Miguel"
            className="rounded-xl mb-4 w-full h-80 object-cover"
          />
          <h3 className="text-xl font-semibold mb-2">Amanda & Miguel</h3>
          <p className="text-sm text-gray-200">
            Amanda joined Tinder on Jan 4, 2021. That very same day, she matched...
            <span className="text-pink-400 underline ml-1 cursor-pointer">Continue reading ↗</span>
          </p>
        </div>

        {/* Story 3 */}
        <div className="bg-white/10 border border-white/20 p-6 rounded-2xl shadow-md backdrop-blur-md flex flex-col justify-between">
          <img
            src="https://tinder.com/static/build/0384d00f873ea411d190c0216e798f96.webp"
            alt="Swipe Stories"
            className="rounded-xl mb-4 w-full h-80 object-cover"
          />
          <h3 className="text-xl font-semibold mb-2">Share your story or read more</h3>
          <p className="text-sm text-pink-400 underline cursor-pointer">
            Tinder Swipe Stories ↗
          </p>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="relative z-10 text-gray-400 py-10 px-4 sm:px-12 text-sm backdrop-blur-md bg-black/60">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-6 flex-wrap justify-center items-center">
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2">
            <img src="https://img.icons8.com/color/24/youtube-play.png" alt="yt" /> YouTube
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2">
            <img src="https://img.icons8.com/ios-filled/24/ffffff/twitterx.png" alt="X" /> X
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2">
            <img src="https://img.icons8.com/color/24/instagram-new--v1.png" alt="insta" /> Instagram
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-2">
            <img src="https://img.icons8.com/color/24/facebook-new.png" alt="fb" /> Facebook
          </a>
        </div>
        <a href="/terms" className="hover:text-white underline text-center">
          Terms & Conditions
        </a>
      </div>
      <p className="text-center mt-4 text-xs text-gray-600">
        © {new Date().getFullYear()} PullRequest. All rights reserved.
      </p>
    </footer>
  </div>
);

};

export default Login;
