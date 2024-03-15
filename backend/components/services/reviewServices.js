const Review = require("../model/Review");

const createReview = async (movieId, userId, reviewData) => {
    try{
        const review = await Review.create({
            movieId: movieId,
            userId: userId,
            ...reviewData,
          });
        
          return review;
    }
    catch(error){
        throw error;
    }
};


const updateReview = async(userId,movieId,reviewId, reviewData) => {
    try{
        const review = await Review.findOneAndUpdate(
            { _id: reviewId, movieId: movieId, userId:userId },
            reviewData,
            { new: true }
          );
          return review;
    }
    catch(error){
        throw error;
    }
};

const deleteReview = async(userId,movieId,reviewId) => {
    try{
        const review = await Review.findOneAndDelete({
            _id: reviewId,
            movieId: movieId,
            userId: userId
          });

          return review;
    }
    catch(error){
        throw error;
    }
};

const getReviews = async(movieId) => {
    try{
        const reviews = await ReviewModel.find({ movieId: movieId }, { review: 1, _id: 0 });
        const reviewArray = reviews.map(review => review.review);

        return reviewArray;
    }
    catch(error){
        throw error;
    }
};

const getRating = async(movieId) => {
    try{
        const reviews = await Review.find({ movieId: movieId });
        if (reviews.length === 0) {
            throw new Error("No review found for this movie");
        }
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        const avgRating = totalRating / reviews.length;

        return {averageRating : avgRating};
    }
    catch(error){
        throw error;
    }
};

module.exports = {createReview, updateReview,deleteReview, getReviews, getRating};
