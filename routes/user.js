const express= require('express')

const router=express.Router();

// middlewares
const { authCheck } = require("../middlewares/auth");
// controllers
const { userCart,
    getUserCart ,
    emptyCart ,
    saveAddress,
    applyCouponToUserCart,
    createOrder,
    orders,
    addToWishlist,
    wishlist,
    removeFromWishlist,
    createCashOrder,
    } = require("../controllers/user");

router.post('/user/cart',authCheck,userCart); //save cart
router.get('/user/cart',authCheck,getUserCart);//get cart
router.delete('/user/cart',authCheck,emptyCart);//empty cart
router.post("/user/address", authCheck, saveAddress);

router.post("/user/order", authCheck, createOrder);
router.post("/user/cash-order", authCheck, createCashOrder);
router.get("/user/orders", authCheck, orders);

//coupon
router.post('/user/cart/coupon',authCheck,applyCouponToUserCart); //save cart

// wishlist
router.post("/user/wishlist", authCheck, addToWishlist);
router.get("/user/wishlist", authCheck, wishlist);
router.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

//route
// router.get("/user",(req,res)=>{
//     res.json({
//         data:"hey you hit user Api",
//     });
// });

module.exports=router;