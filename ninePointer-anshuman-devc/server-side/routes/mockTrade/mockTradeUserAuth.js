const express = require("express");
const router = express.Router();
require("../../db/conn");
const MockTradeDetails = require("../../models/mock-trade/mockTradeUserSchema");
const axios = require('axios');

router.post("/mocktradeuser", async (req, res)=>{

    let {exchange, symbol, buyOrSell, Quantity, Price, Product, OrderType,
         TriggerPrice, stopLoss, validity, variety, last_price, createdBy, userId,
          createdOn, uId, isRealTrade, order_id, instrumentToken} = req.body

          console.log(req.body);
          console.log("in the company auth");

    if(!exchange || !symbol || !buyOrSell || !Quantity || !Product || !OrderType || !validity || !variety || !last_price || !instrumentToken){
        console.log(exchange); console.log(symbol); console.log(buyOrSell); console.log(Quantity); console.log(Product); console.log(OrderType); console.log(validity); console.log(variety); console.log(last_price); console.log(instrumentToken);
        console.log(req.body);
        console.log("data nhi h pura");
        return res.status(422).json({error : "please fill all the feilds..."})
    }

    if(buyOrSell === "SELL"){
        Quantity = "-"+Quantity;
    }

    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
    let originalLastPrice;
    let a;
    try{
        // async function func(){
        
            let liveData = await axios.get(`${baseUrl}api/v1/getliveprice`)
            for(let elem of liveData.data){
                if(elem.instrument_token == instrumentToken){

                    originalLastPrice = elem.last_price;
                    console.log("originalLastPrice 38 line", originalLastPrice)
                }
            }
            
            // return originalLastPrice; 
            // originalLastPrice = await 
        // }

        //  a = func();


    } catch(err){
        return new Error(err);
    }

    console.log("originalLastPrice", a)
//     MockTradeDetailsUser.findOne({uId : uId})
//     .then((dateExist)=>{
//         if(dateExist){
//             console.log("data already");
//             return res.status(422).json({error : "date already exist..."})
//         }
//         const mockTradeDetailsUser = new MockTradeDetailsUser({
//             status:"COMPLETE", uId, createdBy, average_price: originalLastPrice, Quantity, Product, buyOrSell, order_timestamp: createdOn,
//             variety, validity, exchange, order_type: OrderType, symbol, placed_by: "ninepointer", userId,
//             isRealTrade, order_id, instrumentToken
//         });

//         console.log("mockTradeDetails", mockTradeDetailsUser);
//         mockTradeDetailsUser.save().then(()=>{
//             res.status(201).json({massage : "data enter succesfully"});
//         }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
//     }).catch(err => {console.log(err, "fail")});
})

router.get("/readmocktradeuser", (req, res)=>{
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

router.get("/readmocktradeuser/:id", (req, res)=>{
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

router.get("/readmocktradeuseremail/:email", (req, res)=>{
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


router.get("/readmocktradeuserpnl/:email/:status", (req, res)=>{
    const {email, status} = req.params
    MockTradeDetails.find({userId: email, status:status})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.get("/readmocktradeuserDate/:email", (req, res)=>{
    const {email} = req.params
    let date = new Date();
    let todayDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${(date.getFullYear())}`
    console.log(todayDate);
    MockTradeDetails.find({order_timestamp: {$regex: todayDate}, userId: {$regex: email}})
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

router.get("/readmocktradeuserDate", (req, res)=>{
    let date = new Date();
    let todayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
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
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

// /:email/:firstDate/:secondDate
router.get("/readmocktradeuserbetweenrange", (req, res)=>{
    const {email, firstDate, secondDate} = req.params
    MockTradeDetails.find({ order_timestamp: { $gt: "05-12-2022 12:15:54", $lt: "05-12-2022 12:11:01" } })
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

module.exports = router;
