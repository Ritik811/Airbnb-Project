const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const controllerListing = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const Listing = require("../models/listing.js");
const upload = multer({ storage });

// index and create route
router
  .route("/")
  .get(wrapAsync(controllerListing.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(controllerListing.createListing)
  );

// new routes
router.get("/new", isLoggedIn, controllerListing.newRenderForm);

router.get("/search", wrapAsync(controllerListing.search));

router
  .route("/:id")
  .get(wrapAsync(controllerListing.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(controllerListing.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(controllerListing.destroy));

// edit routes
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(controllerListing.renderEditForm)
);

module.exports = router;
