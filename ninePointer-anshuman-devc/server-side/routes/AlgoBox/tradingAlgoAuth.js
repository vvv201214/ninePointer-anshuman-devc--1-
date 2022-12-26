const express = require("express");
const router = express.Router();
require("../../db/conn");
const TradingAlgo = require("../../models/AlgoBox/tradingAlgoSchema");

router.post("/tradingalgo", (req, res)=>{
    const {algoName, transactionChange, instrumentChange, status, exchangeChange, lotMultipler, productChange, tradingAccount, lastModified, uId, createdBy, createdOn, realTrade} = req.body;

    if(!algoName || !transactionChange || !instrumentChange || !status || !exchangeChange || !lotMultipler || !productChange || !tradingAccount || !lastModified || !uId || !createdBy || !createdOn){
        console.log(req.body);
        console.log("data nhi h pura");
        return res.status(422).json({error : "plz filled the field..."})
    }

    TradingAlgo.findOne({uId : uId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const tradingAlgo = new TradingAlgo({algoName, transactionChange, instrumentChange, 
            status, exchangeChange, lotMultipler, productChange, tradingAccount, lastModified, 
            uId, createdBy, createdOn, isRealTrade:realTrade});

        tradingAlgo.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
})

router.get("/readtradingAlgo", (req, res)=>{

    TradingAlgo.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

router.get("/readtradingAlgo/:id", (req, res)=>{
    console.log(req.params)
    const {id} = req.params
    TradingAlgo.findOne({_id : id})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.put("/readtradingAlgo/:id", async (req, res)=>{
    console.log(req.params)
    console.log("this is body", req.body);
    try{
        const {id} = req.params
        const tradingAlgo = await TradingAlgo.findOneAndUpdate({_id : id}, {
            $set:{
                algoName: req.body.algo_Name,
                transactionChange: req.body.transaction_Change,
                instrumentChange: req.body.instrument_Change,
                status: req.body.Status,
                exchangeChange: req.body.exchange_Change,
                lotMultipler: req.body.lot_Multipler,
                productChange: req.body.product_Change,
                tradingAccount: req.body.trading_Account,
                lastModified: req.body.lastModified
            }
        })
        console.log("this is role", tradingAlgo);
        res.send(tradingAlgo)
        // res.status(201).json({massage : "data edit succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to edit data"});
    }
})

router.patch("/readtradingAlgo/:id", async (req, res)=>{
    console.log(req.params)
    console.log("this is body", req.body);
    try{ 
        const {id} = req.params
        const {realTrade} = req.body;
        console.log(realTrade);
        const tradingAlgo = await TradingAlgo.findOneAndUpdate({_id : id}, {
            $set:{ 
                
                isRealTrade: realTrade
            }
            
        })
        console.log("this is role", tradingAlgo);
        res.send(tradingAlgo)
        // res.status(201).json({massage : "data patch succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to edit data"});
    }
})

router.delete("/readtradingAlgo/:id", async (req, res)=>{
    console.log(req.params)
    try{
        const {id} = req.params
        const tradingAlgo = await TradingAlgo.deleteOne({_id : id})
        console.log("this is userdetail", tradingAlgo);
        // res.send(userDetail)
        res.status(201).json({massage : "data delete succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to delete data"});
    }

})



module.exports = router;