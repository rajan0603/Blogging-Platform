import React, { useState } from 'react';
import {Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useSnackbar } from "notistack";
import { API_BASE_URL } from '../../config';

function Register() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if(formData.password !== formData.confirmPassword){
      enqueueSnackbar("Password and confirm password does not match",{
        variant:"error",
      });
    }
    try{
      setIsLoading(true);
      const data = {
        username: formData.username,
        email: formData.email,
        password: formData.password
      };
      const res = await axios.post(`${API_BASE_URL}/users/register`, data);

      if(res.status === 201){
         enqueueSnackbar("Register Successfully", {  variant:"success"});
      }
      navigate("/login");
    }
    catch(error){
      if (error?.response?.data?.message)
        enqueueSnackbar(error?.response?.data?.message, { variant: "error" });

      console.log("Error");
    }
    finally{
      setIsLoading(false);
    }
  };



  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl mb-4 text-center font-bold text-blue-500">Register</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
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
              Register
            </button>
          </div>
        <div className="block text-gray-700 text-sm font-bold mb-2 pt-3" >
          <p>Already have account? {" "} <Link to="/login" className='text-blue-500 hover:text-blue-700'>Login</Link> </p>
        </div>
      </div>
    </div>
  );
}

export default Register;


