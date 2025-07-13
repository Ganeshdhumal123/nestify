const express = require("express");
const app = express();
const router = express.Router();
const wrapAsync = require("../utilis/wrapAysnc");
const {listingSchema ,reviewSchema} = require("../schema.js");
const ExpressError =require("../utilis/ExpressError");
const Listing = require("../models/listing");
const {isLoggedIn , isOwner} = require("../middleware.js");
const ListingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });
// const Review = require("../models/review.js");


const validateListing = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};
router 
    .route("/")
    .get(wrapAsync(ListingController.renderForm))
    .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.rendernewform));
    

    


// new route 
router.get("/new",isLoggedIn ,(req,res)=>{
    console.log(req.user);
    res.render("listings/new.ejs");
});
router
    .route("/:id")
    .get(wrapAsync(ListingController.index))
    .put(isLoggedIn,isOwner,wrapAsync(ListingController.updateListing))
    .delete(isLoggedIn,isOwner,wrapAsync(ListingController.destroyListing));


//edit route 
router.get("/:id/edit",isLoggedIn,wrapAsync(async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
     if(!listing){
        req.flash("error" ," listing does not exist");
       return res.redirect("/listings");
    }
    

    res.render("listings/edit.ejs", { listing,  });

}));

module.exports = router;
