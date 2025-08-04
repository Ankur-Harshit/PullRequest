import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [emailId, setEmailId] = useState("ankur@gmail.com");
    const [password, setPassword] = useState("Ankur@123");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try{
            const res = await axios.post("http://localhost:3000/login", {
                emailId,
                password,
            },
            {
                withCredentials: true
            });
            dispatch(addUser(res.data));
            return navigate("/");
        }
        catch(err){
          setError(err?.response?.data);
          console.log(err);
        }
    }

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-200 w-96 h-100">
        <div className="card-body">
          <h2 className="card-title justify-center font-bold text-2xl">Login</h2>
          <div className="card-actions justify-center">
            <input type="text" placeholder="Email Id" className="input m-2 p-2" 
            value={emailId} onChange={(e)=>setEmailId(e.target.value)}/>
            <input type="text" placeholder="Password" className="input m-2 p-2" 
            value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <div className="text-red-500">{error}</div> 
          </div>
          <div className="flex justify-center"><button className="btn btn-primary my-5" onClick={handleLogin}>Login</button></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
