import React from 'react';

const Navbar = () => {
  return (
    <nav className="">
      <div className="flex items-center h-full px-12 py-2">
        {/* Left side items */}
        <div className="mr-auto ml-20 flex items-center px-20">
          <div className="m-2 text-base leading-tight">
            <span className="block text-white font">Code</span>
            <span className="block text-white font">Royale</span>
          </div>
        </div>

        {/* Right side items */}
        <div className="mr-20 flex items-center px-20">
          <div className="mr-4 pr-20">
            <span className="block text-white text-lg font leading-5">Practice</span>
          </div>
          <div className="mr-4 pr-20">
            <span className="block text-white text-lg font leading-5">Compete</span>
          </div>
          <button className="rounded-tl-xl rounded-bl-xl rounded-br-xl py-2 px-8 border border-white  cursor-pointer">
            <span className="text-white font text-base">
              Sign Up
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
