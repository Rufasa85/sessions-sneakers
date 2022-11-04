const express = require('express');
const router = express.Router();
const {User,Sneaker} = require('../models');

router.get("/",(req,res)=>{
    res.render("home")
})

router.get("/profile",(req,res)=>{
    if(!req.session.userInfo){
        return res.redirect("/login")
    }
    User.findByPk(req.session.userInfo.id,{
        include:[Sneaker]
    }).then(userData=>{
        const plainData = userData.get({plain:true})
        console.log(plainData)
       res.render("profile",plainData);
    }).catch(err=>{
        res.status(500).json({msg:"error occurred",err})
    })
})

module.exports = router;