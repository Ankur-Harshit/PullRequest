import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import Toast from "./components/Toast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotourl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about || "");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, photoUrl, about, gender },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShowToast(true);
      dispatch(addUser(res?.data?.data));
      setTimeout(()=>{
        setShowToast(false);
      }, 3000);

    } catch (err) {
      console.log(err.message);
    }
  };
  const savePhoto = async(e)=>{
    const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("profilePic", file);
    try{
      const res = await axios.post(BASE_URL + "/profile/edit/photo", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPhotourl(res?.data?.imageUrl);
      dispatch(addUser(res?.data?.data));

    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-10 p-6 min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="fixed top-5 z-50">
        {showToast && <Toast message={"Profile Saved!"}/>}
      </div>
      {/* Form Section */}
      <div className="w-full max-w-md bg-black/30 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-xl">
        <h2 className="text-3xl font-semibold text-center mb-6 border-b border-fuchsia-500 pb-2">
          Edit Profile
        </h2>

        <div className="space-y-4">
          <div>
            <label className="font-semibold">First Name</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1 bg-black text-white border-gray-700"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Last Name</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1 bg-black text-white border-gray-700"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Age</label>
            <input
              type="number"
              className="input input-bordered w-full mt-1 bg-black text-white border-gray-700"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Gender (only write male/female not in capitals)</label>
            <input
              type="text"
              className="input input-bordered w-full mt-1 bg-black text-white border-gray-700"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>

          {/* ✅ New File Upload for Profile Pic */}
          <div>
            <label className="font-semibold">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full mt-1 bg-black text-white border-gray-700"
              onChange={savePhoto}
            />
          </div>

          <div>
            <label className="font-semibold">About</label>
            <textarea
              className="textarea textarea-bordered w-full mt-1 bg-black text-white border-gray-700"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-center">
            <button
              className="btn btn-primary bg-fuchsia-600 hover:bg-fuchsia-700 border-none mt-4 px-8"
              onClick={saveProfile}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>

      {/* Preview Card Section */}
      <div className="flex justify-center w-full lg:w-auto">
        <UserCard
          user={{ firstName, lastName, age, photoUrl, about, gender }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
