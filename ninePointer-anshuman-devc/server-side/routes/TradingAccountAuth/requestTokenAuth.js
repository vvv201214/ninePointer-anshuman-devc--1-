const express = require("express");
const router = express.Router();
require("../../db/conn");
const RequestToken = require("../../models/Trading Account/requestTokenSchema")

router.post("/requestToken", (req, res)=>{
    const {accountId, accessToken, requestToken, status, generatedOn, lastModified, createdBy, uId} = req.body;

    if(!accountId || !accessToken || !requestToken || !status || !generatedOn || !lastModified || !createdBy || !uId){
        console.log("data nhi h pura");
        return res.status(422).json({error : "plz filled the field..."})
    }

    RequestToken.findOne({uId : uId})
    .then((accountIdExist)=>{
        if(accountIdExist){
            console.log("accountId already");
            return res.status(422).json({error : "account Id already exist..."})
        }
        const requestTokens = new RequestToken({accountId, accessToken, requestToken, status, generatedOn, lastModified, createdBy, uId});

        requestTokens.save().then(()=>{
            res.status(201).json({massage : "data enter succesfully"});
        }).catch((err)=> res.status(500).json({error:"Failed to enter data"}));
    }).catch(err => {console.log(err, "fail")});
    
})

router.get("/readRequestToken", (req, res)=>{
    RequestToken.find((err, data)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(data);
        }
    }).sort({$natural:-1})
})

router.get("/readRequestToken/:id", (req, res)=>{
    console.log(req.params)
    const {id} = req.params
    RequestToken.findOne({_id : id})
    .then((data)=>{
        return res.status(200).send(data);
    })
    .catch((err)=>{
        return res.status(422).json({error : "date not found"})
    })
})

router.put("/readRequestToken/:id", async (req, res)=>{
    console.log(req.params)
    console.log("this is body", req.body);
    try{
        const {id} = req.params
        const requestToken = await RequestToken.findOneAndUpdate({_id : id}, {
            $set:{
                accountId: req.body.AccountID,
                accessToken: req.body.AccesToken,
                requestToken: req.body.RequestToken,
                status: req.body.Status,
                lastModified: req.body.lastModified
            }
        });
        console.log("this is role", requestToken);
        res.send(requestToken)
        // res.status(201).json({massage : "data edit succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to edit data"});
    }
})

router.delete("/readRequestToken/:id", async (req, res)=>{
    console.log(req.params)
    try{
        const {id} = req.params
        const requestToken = await RequestToken.deleteOne({_id : id})
        console.log("this is userdetail", requestToken);
        // res.send(userDetail)
        res.status(201).json({massage : "data delete succesfully"});
    } catch (e){
        res.status(500).json({error:"Failed to delete data"});
    }

})

router.patch("/readRequestToken/:id", async (req, res)=>{
    console.log(req.params)
    console.log("this is body", req.body);
    try{ // Broker, AccountID, AccountName, APIKey, APISecret, Status, lastModified
        const {id} = req.params
        const account = await Account.findOneAndUpdate({_id : id}, {
            $set:{
                status: req.body.Status,
                lastModified: req.body.lastModified
            }
        })
        console.log("this is role", account);
        res.send(account)
    } catch (e){
        res.status(500).json({error:"Failed to edit data"});
    }
})


module.exports = router;