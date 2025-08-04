import React from "react";

const UserCard = ({user}) => {
    const {firstName, lastName, age, photoUrl, about, gender} = user;
  return (
    <div className="card bg-base-300 w-80 shadow-lg">
      <figure>
        <img
          src={photoUrl}
          alt="Profile Pic"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
          {age + "  " + gender}
        </p>
        <p>
          {about}
        </p>
        <div className="card-actions justify-center m-4">
          <button className="btn btn-secondary">Interested</button>
          <button className="btn btn-primary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
