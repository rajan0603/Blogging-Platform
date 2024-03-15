const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({path : "./.env"});
const authRoutes = require("./components/routes/authRoutes");
const moviesRoutes = require("./components/routes/moviesRoutes");


const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI

app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/movies", moviesRoutes);

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