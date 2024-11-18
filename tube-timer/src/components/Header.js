import React from 'react';
import icon from '../assets/icon.png';

function Header() {
  return (
    <header className="bg-black text-white p-4 flex flex-col sm:flex-row justify-between items-center border-red-700 border-b-2">
      {/* Left section: Icon and Title */}
      <div className="flex items-center space-x-2">
        {/* Icon */}
        <img src={icon} alt="Tube Timer Icon" className="h-20" />
        
        {/* Title */}
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-bold text-red-700 font-sans font-bold">Tube Timer</h1>
          <p className="text-sm sm:text-base">Developed by Aditi</p>
        </div>
      </div>

      {/* Right section: Links */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
        <a
          href="https://www.linkedin.com/in/aditiiprasad" // Replace with your LinkedIn URL
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 hover:bg-black border-red-700 border-2 text-white py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-300"
        >
          <i className="fab fa-linkedin"></i> {/* LinkedIn Icon */}
          <span>LinkedIn</span>
        </a>

        <a
          href="https://github.com/aditiiprasad" // Replace with your GitHub URL
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 hover:bg-black border-red-700 border-2 text-white py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-300"
        >
          <i className="fab fa-github"></i> {/* GitHub Icon */}
          <span>GitHub</span>
        </a>

        <a
          href="https://leetcode.com/aditiiprasad" // Replace with your LeetCode URL
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 hover:bg-black border-red-700 border-2 text-white py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-300"
        >
          <i className="fab fa-leetcode"></i> {/* LeetCode Icon */}
          <span>LeetCode</span>
        </a>

        <a
          href="https://yourresume.com" // Replace with your Resume URL
          download
          className="bg-red-600 hover:bg-black border-red-700 border-2 text-white py-2 px-4 rounded-md flex items-center space-x-2 transition-colors duration-300"
        >
          <i className="fas fa-file-download"></i> {/* Download Resume Icon */}
          <span>Download Resume</span>
        </a>
      </div>
    </header>
  );
}

export default Header;
