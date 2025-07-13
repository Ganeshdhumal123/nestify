const Listing = require("../models/listing");
const {listingSchema ,reviewSchema} = require("../schema.js");

module.exports.index = (async(req, res) => {
    let {id} = req.params;
   const listing = await Listing.findById(id)
  .populate({
    path: "reviews",
  })
  .populate("owner");

    if(!listing){
       req.flash("error" ," listing does not exist");
       return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
    currUser: req.user
});

  
module.exports.updateListing = (async(req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"send value data for listing");
    }
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id);

    if(typeof req.file!== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    }
    if(!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","You dont have permission to edit !");
    return res.redirect(`/listings/${id}`);  
    }
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success","Successfully updated listing !");
    res.redirect(`/listings/${id}`);
});

module.exports.destroyListing =async(req,res)=>{
    let {id} = req.params;
     let deletedListing = await Listing.findByIdAndDelete(id);
     console.log(deletedListing);
     req.flash("success","listing deleted successfully!");
     res.redirect("/listings");
}

module.exports.renderForm = (async (req,res)=>{
  const {id} = req.params
  //   if (!id) {
  //   return res.status(400).send("ID is missing.");
  // }
    
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
 });

module.exports.rendernewform = (async(req,res,next)=>{
let url = req.file.path;
let filename = req.file.filename;
const newListing = new Listing(req.body.listing);
newListing.owner = req.user._id;
newListing.image = {url,filename};
await newListing.save();
req.flash("success","Successfully created a new listing!");
res.redirect("/listings");

});

