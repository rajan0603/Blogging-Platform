const movieServices = require("../services/moviesServices");

const createMovie = async (req,res) => {
    try{
        const movie = await movieServices.createMovie(req.body);
        res.status(201).json(movie);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

const getMovie = async(req,res) => {
    try{
        const {id} = req.params;
        const movie = await movieServices.getMovie(id);
        res.status(200).json(movie);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateMovie = async(req,res) => {
    try{
        const {id} = req.params;
        const movie = await movieServices.updateMovie(id, req.body);

        if(!movie){
            res.status(404).json({
                message: "movie not found"
            });
        }
        res.status(200).json(movie);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteMovie = async(req,res) => {
    try{
        const {id} = req.params;
        const movie = await movieServices.deleteMovie(id);

        if(!movie){
            res.status(404).json({
                message: "movie not found"
            });
        }
        res.status(200);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

const getAllMovies = async(req,res) => {
    try{
        const movies = movieServices.getAllMovies(req.query);
        if(!movies){
            res.status(404).json({
                message: "movie not found"
            });
        }
        res.status(200).json(movies);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {createMovie, getMovie, updateMovie,deleteMovie, getAllMovies};