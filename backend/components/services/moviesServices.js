const Movie = require("../model/Movie");

const createMovie = async (movieData) => {
    try{
        const movie = await Movie.create(movieData);
        
        return movie;
    }
    catch(error){
        throw error;
    }
};

const getMovie = async(movieId) => {
    try{
        const movie = await Movie.find({_id:movieId});
        if(!movie){
            throw new Error("movie not found");
        }

        return movie;
    }
    catch(error){
        throw error;
    }
};

const updateMovie = async(movieId, updatedData) => {
    try{
        const movie = await Movie.findOneAndUpdate(
            {_id:movieId}, 
            {$set : updatedDate},
            {new:true},
        );

        return movie;
    }
    catch(error){
        throw error;
    }
};

const deleteMovie = async(movieId) => {
    try{
        const movie = await Movie.findOneAndDelete(
            {_id:movieId}
        );

        return movie;
    }
    catch(error){
        throw error;
    }
};

const getAllMovies = async({ genre, releaseYear, director }) => {
    try{
        const query = {};
        if (genre) query.genre = genre;
        if (releaseYear) query.releaseYear = releaseYear;
        if (director) query.director = director;

        const movies = await Movie.find({query});

        return movies;

    }
    catch(error){
        throw error;
    }
};

module.exports = {createMovie, getMovie, updateMovie,deleteMovie, getAllMovies};