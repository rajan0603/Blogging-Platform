const express = require("express");
const moviesController = require("../controllers/moviesController");
const reviewController = require("../controllers/reviewController");
const authenticateToken = require("../middleware/authTokenJWT");

const router = express.Router();

router.post("/",  moviesController.createMovie);
router.get("/:id", moviesController.getMovie);
router.get("/", moviesController.getAllMovies);
router.put("/:id", moviesController.updateMovie);
router.delete("/:id",moviesController.deleteMovie);


router.post("/:id/reviews", authenticateToken, reviewController.createReview );
router.put("/:movieId/reviews/:reviewId", authenticateToken, reviewController.updateReview);
router.delete("/:movieId/reviews/:reviewId", authenticateToken, reviewController.deleteReview);
router.get("/:id/reviews", reviewController.getReviews);
router.get("/:id/averageRating",reviewController.getRating);

module.exports = router;