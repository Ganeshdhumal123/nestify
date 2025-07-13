const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utilis/ExpressError");
const {listingSchema ,reviewSchema} = require("./schema.js");
app.use(express.static(path.join(__dirname, "public")));
const reviewRouter = require("./routers/reviews.js");
const session = require("express-session");
const MongoStore =  require("connect-mongo");
const flash = require("connect-flash");
const listingRouter = require("./routers/listing.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter  = require("./routers/user.js");

require("dotenv").config();

main().then(()=>{
    console.log("Conected to db");
}).catch((err)=>{console.log(err);

});
db = process.env.DB_URL;
async function main(){
    await mongoose.connect(process.env.DB_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

const store = MongoStore.create({
  mongoUrl: db,
  crypto:{
    secret: process.env.SECRET,
    touchAfter: 24 * 60 * 60, // 1 day
  }
});

store.on("error", (er)=>{
console.log("error in session",er);
});
const sessionOptions ={
  store,
  secret:process.env.SECRET ,
  resave:false,
 saveUninitialized:true,
  cookie:{
    expires:Date.now() + 7*24*60*60*1000,
    maxAge :7*24*60*60*1000,
    httpOnly :true,
  },
};
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) =>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  console.log("req.user in middleware:", req.user); 
  next();
})


app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewRouter)
app.use("/" , userRouter);



// app.all("*", (req,res,next) => {
//     next(new ExpressError(404,"Page Not Found"));
//   });
  
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong!";
    // res.status(statusCode).send(message);

    res.render("error.ejs" ,{message,err});
  });
  
  app.listen(8080, () => {
    console.log("working on 8080");
  });