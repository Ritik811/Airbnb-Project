const express = require("express");
const wrapAsync = require("../utils/wrapAsync");

const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const Review = require("../models/Reviews.js");
const controllerReview = require("../controllers/reviews.js");
const router = express.Router({ mergeParams: true });

// Post Routes
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(controllerReview.createReview)
);

// Review Delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(controllerReview.destroyReview)
);

module.exports = router;
