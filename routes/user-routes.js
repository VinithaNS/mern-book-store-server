const express = require('express');
const User =require('../model/userModel.js');
const bcrypt = require('bcryptjs');

const userRouter = express.Router();

//for login user
userRouter.post("/login", async(req, res) => {
    const user = await User.findOne({email: req.body.email});
    //if user exists
    if(user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                username: user.username
            });
            return;
        }
    }
    res.status(401).send({message: "Invalid Email or Password"});
});



//for register user
userRouter.post("/register", async(req, res) => {
    const newUser  = new User({
        username: req.body.username,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password)
    });
    const user = await newUser.save();
    res.send({
        _id: user._id,
        username: user.username
    })
});




module.exports = userRouter;