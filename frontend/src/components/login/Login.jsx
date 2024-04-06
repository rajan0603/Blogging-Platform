import React, { useState } from 'react';
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import {API_BASE_URL} from "../../config";
import { useSnackbar } from "notistack";

function Login() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const data = {
        email: formData.email,
        password: formData.password,
      };
      const res = await axios.post(`${API_BASE_URL}/users/login`, data);

      if (res.status === 200) {
        enqueueSnackbar("User logged in successfully", { variant: "success" });
        localStorage.setItem("token", res?.data?.token);
        navigate("/");
      }
    } catch (error) {
      if (error?.response?.data?.message)
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });

      console.log("Error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center font-bold text-blue-500">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        <div className="block text-gray-700 text-sm font-bold mb-2 pt-3" >
          <p>Don't have account? {" "} <Link to="/register" className='text-blue-500 hover:text-blue-700'>Sign up</Link> </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
