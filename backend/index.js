const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({path : "./.env"});
const authRoutes = require("./components/routes/authRoutes");
const bloggingRoutes = require("./components/routes/bloggingRoutes");
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Import cors middleware


const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI

app.use(express.json());
app.use(bodyParser.json());

// app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };
  
app.use(cors(corsOptions));
// app.options("*", cors());
   
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/users", authRoutes);
app.use("/api/blogs", bloggingRoutes);

app.use("/", (req,res) => {
    res.send("server running...");
    res.end();
});

mongoose.connect(uri)
.then(() => console.log("connect to database"))
.catch((err) => console.log("failed to connect"));

app.listen(port, () => {
    console.log("connect to port",port);
});