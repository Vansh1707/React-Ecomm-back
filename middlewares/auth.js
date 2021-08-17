const admin=require("../firebase");
const User=require("../models/user");

exports.authCheck= async (req,res,next)=>{
    // console.log(req); //token
    try {
        // console.log("response from try block");
        const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);
        console.log("FIREBASE USER IN AUTHCHECK",firebaseUser);
        req.user=firebaseUser;
        next();
    } catch (error) {
        res.status(401).json({
            error:"Invalid or Expired token",
        });
    }
};

exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;
  
    const adminUser = await User.findOne({ email }).exec();
  
    if (adminUser.role !== "admin") {
      res.status(403).json({
        err: "Admin resource. Access denied.",
      });
    } else {
      next();
    }
  };