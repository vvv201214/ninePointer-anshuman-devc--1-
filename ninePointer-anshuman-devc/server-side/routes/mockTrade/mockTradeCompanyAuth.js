const express = require("express");
const router = express.Router();
require("../../db/conn");
const MockTradeDetails = require("../../models/mock-trade/mockTradeCompanySchema");
const MockTradeDetailsUser = require("../../models/mock-trade/mockTradeUserSchema");
const BrokerageDetail = require("../../models/Trading Account/brokerageSchema");
const axios = require('axios');

router.post("/mocktradecompany", async (req, res)=>{

    let {exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType,
         TriggerPrice, stopLoss, validity, variety, last_price, createdBy, userId,
          createdOn, uId, algoBox, order_id, instrumentToken, realTrade, realBuyOrSell, realQuantity} = req.body
        console.log(req.body);
        console.log("in the company auth");
    const {algoName, transactionChange, instrumentChange
        , exchangeChange, lotMultipler, productChange, tradingAccount} = algoBox

        const brokerageDetailBuy = await BrokerageDetail.find({transaction:"BUY"});
        const brokerageDetailSell = await BrokerageDetail.find({transaction:"SELL"});


    if(!exchange || !symbol || !buyOrSell || !Quantity || !Product || !OrderType || !validity || !variety || !last_price || !algoName || !transactionChange || !instrumentChange || !exchangeChange || !lotMultipler || !productChange || !tradingAccount || !instrumentToken){
        console.log(Boolean(exchange)); console.log(Boolean(symbol)); console.log(Boolean(buyOrSell)); console.log(Boolean(Quantity)); console.log(Boolean(Product)); console.log(Boolean(OrderType)); console.log(Boolean(validity)); console.log(Boolean(variety)); console.log(Boolean(last_price)); console.log(Boolean(algoName)); console.log(Boolean(transactionChange)); console.log(Boolean(instrumentChange)); console.log(Boolean(exchangeChange)); console.log(Boolean(lotMultipler)); console.log(Boolean(productChange)); console.log(Boolean(tradingAccount));
        console.log("data nhi h pura");
        return res.status(422).json({error : "please fill all the feilds..."})
    }

    if(buyOrSell === "SELL"){
        Quantity = "-"+Quantity;
    }
    if(realBuyOrSell === "SELL"){
        realQuantity = "-"+realQuantity;
    }

    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
    let originalLastPrice;
    let newTimeStamp = "";
    try{
        
        let liveData = await axios.get(`${baseUrl}api/v1/getliveprice`)
        
        for(let elem of liveData.data){
            console.log(elem)
            if(elem.instrument_token == instrumentToken){
                newTimeStamp = elem.timestamp;
                originalLastPrice = elem.last_price;
                console.log("originalLastPrice 38 line", originalLastPrice)
            }
        }

        let firstDateSplit = (newTimeStamp).split(" ");
        let secondDateSplit = firstDateSplit[0].split("-");
        newTimeStamp = `${secondDateSplit[2]}-${secondDateSplit[1]}-${secondDateSplit[0]} ${firstDateSplit[1]}`


    } catch(err){
        return new Error(err);
    }

    console.log("newTimeStamp", newTimeStamp);


    function buyBrokerage(totalAmount){
        let brokerage = Number(brokerageDetailBuy[0].brokerageCharge);
        // let totalAmount = Number(Details.last_price) * Number(quantity);
        let exchangeCharge = totalAmount * (Number(brokerageDetailBuy[0].exchangeCharge) / 100);
        // console.log("exchangeCharge", exchangeCharge, totalAmount, (Number(brokerageDetailBuy[0].exchangeCharge)));
        let gst = (brokerage + exchangeCharge) * (Number(brokerageDetailBuy[0].gst) / 100);
        let sebiCharges = totalAmount * (Number(brokerageDetailBuy[0].sebiCharge) / 100);
        let stampDuty = totalAmount * (Number(brokerageDetailBuy[0].stampDuty) / 100);
        // console.log("stampDuty", stampDuty);
        let sst = totalAmount * (Number(brokerageDetailBuy[0].sst) / 100);
        let finalCharge = brokerage + exchangeCharge + gst + sebiCharges + stampDuty + sst;
        return finalCharge;
    }

    function sellBrokerage(totalAmount){
        let brokerage = Number(brokerageDetailSell[0].brokerageCharge);
        // let totalAmount = Number(Details.last_price) * Number(quantity);
        let exchangeCharge = totalAmount * (Number(brokerageDetailSell[0].exchangeCharge) / 100);
        let gst = (brokerage + exchangeCharge) * (Number(brokerageDetailSell[0].gst) / 100);
        let sebiCharges = totalAmount * (Number(brokerageDetailSell[0].sebiCharge) / 100);
        let stampDuty = totalAmount * (Number(brokerageDetailSell[0].stampDuty) / 100);
        let sst = totalAmount * (Number(brokerageDetailSell[0].sst) / 100);
        let finalCharge = brokerage + exchangeCharge + gst + sebiCharges + stampDuty + sst;

        return finalCharge
    }

    let brokerageUser;
    let brokerageCompany;

    if(realBuyOrSell === "BUY"){
        brokerageCompany = buyBrokerage(Math.abs(Number(realQuantity)) * originalLastPrice);
    } else{
        brokerageCompany = sellBrokerage(Math.abs(Number(realQuantity)) * originalLastPrice);
    }

    if(buyOrSell === "BUY"){
        brokerageUser = buyBrokerage(Math.abs(Number(Quantity)) * originalLastPrice);
    } else{
        brokerageUser = sellBrokerage(Math.abs(Number(Quantity)) * originalLastPrice);
    }
 

    MockTradeDetails.findOne({uId : uId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const mockTradeDetails = new MockTradeDetails({
            status:"COMPLETE", uId, createdBy, average_price: originalLastPrice, Quantity: realQuantity, 
            Product, buyOrSell:realBuyOrSell, order_timestamp: newTimeStamp,
            variety, validity, exchange, order_type: OrderType, symbol, placed_by: "ninepointer", userId,
             algoBox:{algoName, transactionChange, instrumentChange, exchangeChange, 
            lotMultipler, productChange, tradingAccount}, order_id, instrumentToken, brokerage: brokerageCompany,
            tradeBy: createdBy, isRealTrade: realTrade
        });

        console.log("mockTradeDetails comapny", mockTradeDetails);
        mockTradeDetails.save().then(()=>{
            // res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});

    MockTradeDetailsUser.findOne({uId : uId})
    .then((dateExist)=>{
        if(dateExist){
            console.log("data already");
            return res.status(422).json({error : "date already exist..."})
        }
        const mockTradeDetailsUser = new MockTradeDetailsUser({
            status:"COMPLETE", uId, createdBy, average_price: originalLastPrice, Quantity, Product, buyOrSell, order_timestamp: newTimeStamp,
            variety, validity, exchange, order_type: OrderType, symbol, placed_by: "ninepointer", userId,
            isRealTrade: realTrade, order_id, instrumentToken, brokerage: brokerageUser, 
            tradeBy: createdBy
        });

        console.log("mockTradeDetails", mockTradeDetailsUser);
        mockTradeDetailsUser.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> {
            // res.status(500).json({error:"Failed to enter data"})
        });
    }).catch(err => {console.log(err, "fail")});
})


router.get("/readmocktradecompany", (req, res)=>{
    MockTradeDetails.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            (data).sort((a, b)=> {

                if (a.order_timestamp < b.order_timestamp) {
                  return 1;
                }
                if (a.order_timestamp > b.order_timestamp) {
                  return -1;
                }
                return 0;
              });
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

router.get("/readmocktradecompany/:id", (req, res)=>{
    console.log(req.params)
    const {id} = req.params
    MockTradeDetails.findOne({_id : id})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.get("/readmocktradecompanyemail/:email", (req, res)=>{
    const {email} = req.params
    MockTradeDetails.find({userId: email})
    .then((data)=>{
        (data).sort((a, b)=> {

            if (a.order_timestamp < b.order_timestamp) {
              return 1;
            }
            if (a.order_timestamp > b.order_timestamp) {
              return -1;
            }
            return 0;
          });
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.get("/readmocktradecompanyDate", (req, res)=>{
    let date = new Date();
    let todayDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())}`
    const {email} = req.params
    MockTradeDetails.find({order_timestamp: {$regex: todayDate}})
    .then((data)=>{
        (data).sort((a, b)=> {

            if (a.order_timestamp < b.order_timestamp) {
              return 1;
            }
            if (a.order_timestamp > b.order_timestamp) {
              return -1;
            }
            return 0;
          });
        data.reverse();
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})


router.get("/readmocktradecompanypariculardate/:date", (req, res)=>{
    // let date = new Date();
    // let todayDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())}`
    const {date} = req.params
    MockTradeDetails.find({order_timestamp: {$regex: date}})
    .then((data)=>{
        // (data).sort((a, b)=> {

        //     if (a.order_timestamp < b.order_timestamp) {
        //       return 1;
        //     }
        //     if (a.order_timestamp > b.order_timestamp) {
        //       return -1;
        //     }
        //     return 0;
        //   });
        // data.reverse();
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})





module.exports = router;






  