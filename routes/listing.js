const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListng));

//New Route
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

router
.route("/:id")
.get(wrapAsync(listingController.showListng))
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn, isOwner,wrapAsync(listingController.deleteListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports = router;