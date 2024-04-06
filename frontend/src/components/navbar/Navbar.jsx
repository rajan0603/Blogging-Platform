import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

const Navbar = () => {

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
            <div className="flex flex-col items-center justify-around ">
                <img
                    className="h-8 w-8 "
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                    alt="Logo"
                />
                <h1 className="font-bold text-gray-300 text-center">Blog App</h1>
            </div>

          {/* Navigation Links */}
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              <Link
                to="/post"
                className="text-gray-300 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Posts
              </Link>
              <Link
                to="/"
                className="text-gray-300 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                Blogs
              </Link>
            </div>
          </div>

          {/* Logout Button */}
          <div className="hidden sm:block">
            <button
              className="text-gray-300 hover:text-green-500 px-3 py-2 rounded-md text-sm font-medium"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }} 
            >
              Logout
            </button>
          </div>

          {/* Hamburger menu for small screens */}
          <div className="-mr-2 flex sm:hidden">
            <button
              type="button"
              className="text-gray-300 hover:bg-gray-700 hover:text-white inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon for hamburger menu */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive mobile menu */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/posts"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Posts
          </Link>
          <Link
            to="/blogs"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Blogs
          </Link>
          <button
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }} // Handle logout action
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
