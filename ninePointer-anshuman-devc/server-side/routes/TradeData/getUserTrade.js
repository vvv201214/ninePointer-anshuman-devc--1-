const express = require("express");
const router = express.Router();
require("../../db/conn");
const UserTradeData = require("../../models/User/userTradeSchema");

router.get("/usertradedata", (req, res)=>{
    UserTradeData.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

router.get("/usertradedata/:id", (req, res)=>{
    console.log(req.params)
    const {id} = req.params
    UserTradeData.findOne({_id : id})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

module.exports = router;