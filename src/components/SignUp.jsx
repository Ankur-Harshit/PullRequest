import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const SignUp = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      return navigate("/login");
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-black relative overflow-hidden bg-cover bg-center">
      
      {/* Hero Section with Login */}
      <div className="bg-[url('https://images.unsplash.com/photo-1615714145378-d75825c9a475')] bg-cover bg-center">
      <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6 ">
        <h1 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-lg mb-6">
          PullRequest
        </h1>
        <p className="text-lg sm:text-xl text-white max-w-2xl mb-10">
          Connect, collaborate, and build impactful projects with developers
          worldwide. Log in to start your journey. 🚀
        </p>

        {/* Login Card */}
        <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-8">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="First Name"
              className="px-5 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="px-5 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="email"
              className="px-5 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-5 py-3 rounded-lg bg-black/50 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 cursor-pointer hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            {error && (
              <div className="text-red-400 text-center text-sm font-medium">
                {error}
              </div>
            )}

            <button
              onClick={handleSignUp}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition duration-300 shadow-lg"
            >
              SignUp
            </button>
          </div>
        </div>
      </section>
      </div>

      {/* Connect to Devs (Neon Section) */}
      <section className="relative z-10 py-20 px-6 sm:px-12 text-center bg-black">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse drop-shadow-[0_0_15px_rgba(0,255,255,0.7)]">
          ⚡ Connect To Devs ⚡
        </h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Build your network, collaborate on projects, and grow as a developer
          in an active community.
        </p>
      </section>

      {/* Trusted By Section */}
      <section className="relative z-10 py-12 px-6 sm:px-12 bg-black border-t border-white/10">
        <h2 className="text-xl font-semibold text-center text-gray-400 mb-8">
          Trusted by devs at
        </h2>
        <div className="flex flex-wrap justify-center gap-8 text-gray-300 text-lg font-medium">
          <span>Samsung</span>
          <span>SBI</span>
          <span>Hindalco</span>
          <span>Amazon</span>
          <span>Tinder</span>
          <span>Google</span>
          <span>Meta</span>
          <span>Goldman Sachs</span>
          <span>Atlassian</span>
          <span>Microsoft</span>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="relative z-10 py-20 px-6 sm:px-12 bg-black">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          User Reviews
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              name: "Alice",
              text: "Great platform! Found my hackathon team here.",
            },
            { name: "Raj", text: "Met awesome devs, working on open-source now 🚀" },
            { name: "Sophia", text: "Super smooth experience, love the UI & vibe!" },
            { name: "Karan", text: "Collabbed on a startup idea, amazing journey!" },
            {
              name: "Emily",
              text: "Safe, modern and dev-friendly. Highly recommend.",
            },
            {
              name: "Zhang",
              text: "Love connecting with global developers here.",
            },
          ].map((review, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md text-center"
            >
              <p className="text-sm text-gray-300 mb-3">“{review.text}”</p>
              <h3 className="text-cyan-400 font-semibold">- {review.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards Section */}
<section className="relative z-10 py-20 px-6 sm:px-12 bg-black border-t border-white/10">
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
    {[
      {
        title: "User Privacy",
        desc: "Your data is secured with JWT-based authentication.",
        img: "https://images.unsplash.com/photo-1726935018912-134f3c26313a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTl8fHByaXZhY3l8ZW58MHx8MHx8fDA%3D",
      },
      {
        title: "Live Chat",
        desc: "Chat instantly with developers using socket.io.",
        img: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Smooth UI",
        desc: "Beautiful and responsive design powered by TailwindCSS.",
        img: "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VUl8ZW58MHx8MHx8fDA%3D",
      },
    ].map((feature, i) => (
      <div
        key={i}
        className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md text-center shadow-lg flex flex-col items-center"
      >
        <h3 className="text-xl font-semibold text-cyan-400 mb-3">
          {feature.title}
        </h3>
        <p className="text-sm text-gray-300 mb-4">{feature.desc}</p>
        <img
          src={feature.img}
          alt={feature.title}
          className="rounded-lg shadow-md border border-white/10 w-full object-cover"
        />
      </div>
    ))}
  </div>
</section>


      {/* Premium Call To Action */}
      <section className="relative z-10 py-20 px-6 sm:px-12 text-center bg-gradient-to-r from-cyan-500/20 via-black to-purple-600/20 border-t border-white/10">
        <h2 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-6">
          🚀 Join PullRequest Now
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Don’t miss out on building connections, collaborating on projects, and
          leveling up your dev journey.
        </p>
      </section>

      {/* Footer */}
      <footer className="relative z-10 text-gray-400 py-10 px-6 sm:px-12 text-sm bg-black border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex gap-6 flex-wrap justify-center items-center">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white flex items-center gap-2"
            >
              <img
                src="https://img.icons8.com/ios-filled/24/ffffff/github.png"
                alt="gh"
              />{" "}
              GitHub
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white flex items-center gap-2"
            >
              <img
                src="https://img.icons8.com/ios-filled/24/ffffff/twitterx.png"
                alt="X"
              />{" "}
              X
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white flex items-center gap-2"
            >
              <img
                src="https://img.icons8.com/ios-filled/24/ffffff/discord-logo.png"
                alt="discord"
              />{" "}
              Discord
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

export default SignUp;
