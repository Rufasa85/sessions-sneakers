const express = require('express');
const router = express.Router();
const {User,Sneaker} = require('../models');

router.get("/",(req,res)=>{
    User.findAll({
        include:[Sneaker]
    }).then(userData=>{
        res.json(userData)
    }).catch(err=>{
        res.status(500).json({msg:"an error occurred",err})
    })
})

module.exports = router;