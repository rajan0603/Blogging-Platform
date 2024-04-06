import React, { useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { API_BASE_URL } from "../../config";


function Post() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    file: null,
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    console.log(formData);
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          `${API_BASE_URL}/blogs`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      
        if (response.status === 201){
          setFormData({
            name: "",
            title: "",
            file: null, 
            content: "",
          });
        } else{
          throw new Error("Failed to create task.");
        }
        setFormData({
          name: "",
          title: "",
          picture: "",
          content: "",
        });
      } catch (error) {
        console.error("Error creating task:", error);
      }
      
  };

  return (
    <div className="w-4/5 mx-auto">
      <Navbar />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Post Title"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Content:</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Your post content goes here..."
              rows="6"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-6 rounded-lg hover:bg-indigo-600 focus:outline-none"
              onClick={handleSubmit}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;

