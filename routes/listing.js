const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");


const ListingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});

//combine formed of index and create routes
router.route("/")
.get(wrapAsync (ListingController.index))
.post(isLoggedIn,
upload.single('listing[image]'),
wrapAsync (ListingController.createListing)
);
// .post( upload.single('listing[image]'), (req, res) => {
//     res.send(req.file);
// });


// new route
router.get("/new", isLoggedIn, ListingController.renderNewForm);

//combine formed of show and update and delete route
router.route("/:id")
.get( wrapAsync (ListingController.showListing))
.put(isLoggedIn, isOwner, upload.single('listing[image]'), wrapAsync (ListingController.updateListing))
.delete(isLoggedIn, wrapAsync (ListingController.destroyListing));

//Edit route
router.get("/:id/edit",isLoggedIn, isOwner, wrapAsync (ListingController.renderEditForm));

// Index route
// router.get("/",wrapAsync (ListingController.index));

 // Create route note:validatelisting is missing due to errors
//  router.post("/",isLoggedIn, wrapAsync (ListingController.createListing)
// );

// show route
// router.get("/:id", wrapAsync (ListingController.showListing));


// update route validatelisting is missing here
// router.put("/:id",isLoggedIn, isOwner, wrapAsync (ListingController.updateListing));

// Delete Route
// router.delete("/:id",isLoggedIn, wrapAsync (ListingController.destroyListing));

module.exports = router;