const express = require("express");
const app = express();
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utilis/wrapAysnc");
const {listingSchema ,reviewSchema} = require("../schema.js");
const ExpressError =require("../utilis/ExpressError");
const Listing = require("../models/listing");
const Review = require("../models/review.js");      // worlds biggest error occur 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const {isLoggedIn} = require("../middleware.js");
const reviewconroller = require("../controllers/review.js");

const validateReview = (req,res,next) =>{
   
    let {error } = reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};


//reviews
router.post("/", 
  isLoggedIn,
    validateReview,
     wrapAsync(reviewconroller.createReview));

router.delete("/:reviewId", wrapAsync(reviewconroller.deleteReview));

module.exports = router;