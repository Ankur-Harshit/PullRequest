import React from 'react';
import flameIcon from './download.svg';

const Shimmer = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-orange-400">
      <img
        src={flameIcon}
        alt="Loading"
        className="w-16 h-16"
      />
    </div>
  );
};

export default Shimmer;
