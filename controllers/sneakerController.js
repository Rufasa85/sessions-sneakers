const express = require('express');
const router = express.Router();
const {User,Sneaker} = require('../models');
const bcrypt = require("bcrypt")


router.get("/",(req,res)=>{
    Sneaker.findAll({
        include:[User]
    }).then(sneakerData=>{
        res.json(sneakerData)
    }).catch(err=>{
        res.status(500).json({msg:"an error occurred",err})
    })
})

router.post("/",(req,res)=>{
    if(!req.session.userInfo){
        return res.status(403).json({msg:"login first!"})
    }
    Sneaker.create({
        name:req.body.name,
        brand:req.body.brand,
        color:req.body.color,
        UserId:req.session.userInfo.id
    }).then(sneakerData=>{
        res.json(sneakerData)
    }).catch(err=>{
        res.status(500).json({msg:"an error occurred",err})
    })
})

module.exports = router;