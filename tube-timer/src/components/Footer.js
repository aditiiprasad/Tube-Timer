import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white py-6 ">
      <div className="container mx-auto text-center">
        <p className='text-red-700'>&copy; 2024 Tube Timer</p>
        <div className="mt-4 space-x-6">
          <a href="https://github.com/aditiiprasad" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
            <i className="fab fa-github text-xl"></i> GitHub
          </a>
          <a href="https://www.linkedin.com/in/aditiiprasad" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">
            <i className="fab fa-linkedin text-xl"></i> LinkedIn
          </a>
          <a href="mailto:aditi03prasad@gmail.com" className="hover:text-red-500">
            <i className="fas fa-envelope text-xl"></i> Email
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-400">Made with ❤️ by Aditi</p>
      </div>
    </footer>
  );
}

export default Footer;
