const User = require("../models/user");


module.exports.signupform =  (req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.signup = async(req,res)=>{
  try{ 
    let{username ,email,password} = req.body;
  const newUser = new User({email , username});
  console.log("hi");
  const registeredUser = await User.register(newUser,password);
  console.log(registeredUser);
  req.login(registeredUser,(err) =>{
    if(err){
      return next(err);
    }
  req.flash("success","sign up successfully");
  res.redirect("/listings");

  })

}
  catch(e){
    req.flash("error" , e.message);
     res.redirect("/signup");
  }

}

module.exports.renderLoginform =  (req,res)=>{
    res.render("user/login.ejs");
};

module.exports.login = async(req,res)=>{
       req.flash("success" ,"welcome back to Wanderlust !");
       let redirectUrl = res.locals.redirectUrl || "/listings";
       res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
  req.logout((err) =>{
    if(err){
  return next();
    }
    req.flash("success" , "you are  logged out");
    res.redirect("/listings");
  });
};