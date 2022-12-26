const express = require("express");
const router = express.Router();
const axios = require('axios');
require("../db/conn");
const RequestToken = require("../models/Trading Account/requestTokenSchema");
const Account = require("../models/Trading Account/accountSchema");


const accessTokenAndapikey = (req, res, next)=>{

    let date = new Date();
    let today = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`

    async function accessToken(){
    let getAccessToken = await RequestToken.find();
    return getAccessToken;
    }

    async function apiKey(){
    let apiKey = await Account.find();
    return apiKey;
    }

    var accessTokenResp = [];
    accessToken().then((res)=>{
    // console.log("res", res)
    accessTokenResp = res;
    // console.log("accessTokenResp", accessTokenResp);
    })

    let apiKeyResp = []
    apiKey().then((res)=>{
    // console.log("res", res)
    apiKeyResp = res;
    // console.log("apiKeyResp", apiKeyResp);
    })

    let getAccessToken;
    let getApiKey;
    setTimeout(()=>{

    // console.log("getAccessToken", accessTokenResp);
        for(let elem of accessTokenResp){
            for(let subElem of apiKeyResp){
            //  console.log("inside 2");
                if(elem.accountId === subElem.accountId && elem.generatedOn === today && elem.status === "Active" && subElem.status === "Active"){
                    getAccessToken = elem.accessToken;
                    getApiKey = subElem.apiKey
                }
            }
        }

    console.log("getAccessToken, getApiKey", getAccessToken, getApiKey);
    process.env.ACCESS_TOKEN = getAccessToken;
    process.env.API_KEY = getApiKey;
    console.log(process.env.ACCESS_TOKEN, process.env.API_KEY)
    // next();
    },4000)
    
}

module.exports = accessTokenAndapikey;