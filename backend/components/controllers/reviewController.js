const reviewServices = require("../services/reviewServices");

const createReview = async (req,res) => {
    try{
        const {id} = req.params;
        const userId = req.user.id;
        const review = await reviewServices.createReview(id, userId, req.body);
        res.status(201).json(review);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};


const updateReview = async(req,res) => {
    try{
        const {movieId,reviewId} = req.params;
        const userId = req.user.id;
        const review = await reviewServices.updateReview(userId,movieId,reviewId, req.body);

        if(!review){
            res.status(404).json({
                message: "review not found"
            });
        }
        res.status(200).json(review);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteReview = async(req,res) => {
    try{
        const {movieId,reviewId} = req.params;
        const userId = req.user.id;
        const review = await reviewServices.deleteReview(userId,movieId,reviewId);

        if(!review){
            res.status(404).json({
                message: "review not found"
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

const getReviews = async(req,res) => {
    try{
        const {id} = req.params;
        const review = reviewServices.getReviews(id);
        if(!review){
            res.status(404).json({
                message: "review not found"
            });
        }
        res.status(200).json(review);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

const getRating = async(req,res) => {
    try{
        const {id} = req.params;
        const rating = reviewServices.getRating(id);
        if(!rating){
            res.status(404).json({
                message: "rating not found"
            });
        }
        res.status(200).json(rating);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {createReview, updateReview,deleteReview, getReviews, getRating};