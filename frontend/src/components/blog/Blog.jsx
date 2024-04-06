
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [commentText, setCommentText] = useState("");
  const isLoggedIn = localStorage.getItem("token") ? true : false;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/blogs`);
      setBlogs(res.data);
    } catch (error) {
      console.log("Failed to fetch blogs", error);
    }
  };

  const handleAddComment = async (id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/blogs/comments/${id}`, {
        text: commentText,
      });
      const updatedBlogs = blogs.map((blog) => (blog._id === id ? response.data : blog));
      setBlogs(updatedBlogs);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLikeClick = async (id) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/blogs/likes/${id}`);
      const updatedBlogs = blogs.map((blog) => (blog._id === id ? response.data : blog));
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="w-4/5 mx-auto">
      {!isLoggedIn && (
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white py-8 px-4 md:px-0 shadow-md">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center">
                <img
                  className="h-16 w-16 mr-2"
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                  alt="Logo"
                />
                <h1 className="text-3xl font-bold">Blog App</h1>
              </div>
              <h2 className="font-semibold text-lg mt-4">Welcome to the Blog App</h2>
              <p className="text-gray-700 mt-2">
                Craft your story, share your passions, and inspire others with your unique perspective. Empower your voice in a community of creators and readers alike, where every word resonates and every story matters.
              </p>
              <div className="flex justify-center mt-6 space-x-4">
                <Link to="/login">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Log In
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div className="w-full">
          <Navbar />
          <div className="mt-8">
            {blogs.map((blog) => (
              <div key={blog._id} className="border-b border-gray-200 py-4">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10 rounded-full mr-2"
                    src="https://via.placeholder.com/50"
                    alt="User Pic"
                  />
                  <p className="text-lg font-semibold">{blog.name}</p>
                </div>
                <h3 className="text-xl font-semibold mt-2">{blog.title}</h3>
                {/* {blog.file && <img src={blog.file} alt="Blog" className="my-2 rounded-md object-cover h-48 w-full" />} */}
                <p className="text-gray-700 mt-2">{blog.content}</p>
                <div className="mt-4">
                  <p className="text-gray-600">Comments: {blog.comments && blog.comments.length}</p>
                  <ul className="list-disc list-inside">
                    {blog.comments &&
                      blog.comments.map((comment, index) => (
                        <li key={index} className="text-gray-700">{comment.text}</li>
                      ))}
                  </ul>
                </div>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleLikeClick(blog._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
                  >
                    Like ({blog.likes})
                  </button>
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="border rounded-md p-2 mr-2 flex-1"
                  />
                  <button
                    onClick={() => handleAddComment(blog._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Comment
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
