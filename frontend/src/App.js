import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Blog from "./components/blog/Blog";
import Post from "./components/post/Post"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element = {<Blog/>} />
          <Route path = '/login' element = {<Login />} />
          <Route path = '/register' element = {<Register/>} />
          <Route path = '/post' element = {<Post/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
