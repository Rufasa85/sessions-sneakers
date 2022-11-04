const express = require('express');
const router = express.Router();
const {User,Sneaker} = require('../models');
const bcrypt = require("bcrypt")


router.get("/",(req,res)=>{
    User.findAll({
        include:[Sneaker]
    }).then(userData=>{
        res.json(userData)
    }).catch(err=>{
        res.status(500).json({msg:"an error occurred",err})
    })
})

router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        //wrong username
        if(!foundUser){
            return res.status(401).json({msg:"Invalid login credentials"})
        } 
        //wrong password
        if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"Invalid login credentials"})
        }
        //correct login
        req.session.userInfo = {
            email:foundUser.email,
            id:foundUser.id
        }
        res.json(foundUser);
    })
})

module.exports = router;