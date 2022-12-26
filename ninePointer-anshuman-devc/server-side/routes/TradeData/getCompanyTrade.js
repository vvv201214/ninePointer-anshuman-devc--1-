const express = require("express");
const router = express.Router();
require("../../db/conn");
const CompanyTradeData = require("../../models/TradeDetails/companyTradeSchema");

router.get("/companytradedata", (req, res)=>{
    CompanyTradeData.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

router.get("/companytradedata/:id", (req, res)=>{
    console.log(req.params)
    const {id} = req.params
    CompanyTradeData.findOne({_id : id})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

module.exports = router;