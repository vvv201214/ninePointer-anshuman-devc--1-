const express = require("express");
const router = express.Router();
const axios = require('axios');
require("../db/conn");


router.get("/getliveprice", async (req, res)=>{
  let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

  let getAccessToken;
  let getApiKey;
  let addUrl = '';
  let date = new Date();
  let today = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`


  try{
    let accessTokenResp = await axios.get(`${baseUrl}api/v1/readRequestToken`)
    let apiKeyResp = await axios.get(`${baseUrl}api/v1/readAccountDetails`)
    
    for(let elem of accessTokenResp.data){//&& elem.generatedOn === today 
      for(let subElem of apiKeyResp.data){
          if(elem.accountId === subElem.accountId && elem.status === "Active" && subElem.status === "Active"){
              getAccessToken = elem.accessToken;
              getApiKey = subElem.apiKey
          }
      }
    }

    console.log("in live price file", getAccessToken, getApiKey);

    const resp = await axios.get(`${baseUrl}api/v1/readInstrumentDetails`);
    let ans = resp.data.filter((elem) => {
      return elem.status === 'Active'
    });
    
    ans.forEach((elem, index) => {
      if (index === 0) {
        addUrl = 'i=' + elem.exchange + ':' + elem.symbol;
      } else {
        addUrl += '&i=' + elem.exchange + ':' + elem.symbol;
      }
    });

  } catch(err) {
    return new Error(err);
  }
  
    let url = `https://api.kite.trade/quote?${addUrl}`;
    const api_key = getApiKey; 
    // const access_token = "ufQicNFLUWFKR84bF8LTE66xAeCQSwCH";
    const access_token = getAccessToken;
    let auth = 'token' + api_key + ':' + access_token;
  
    let authOptions = {
      headers: {
        'X-Kite-Version': '3',
        Authorization: auth,
      },
    };
  
    let arr = [];
      try{

        const response = await axios.get(url, authOptions);
        // console.log("its json data of livePrice", JSON.stringify((response.data).data));
        for (instrument in response.data.data) {
            let obj = {};
            obj.last_price = response.data.data[instrument].last_price;
            obj.instrument_token = response.data.data[instrument].instrument_token;
            obj.average_price = response.data.data[instrument].ohlc.close;
            obj.timestamp = response.data.data[instrument].timestamp
            arr.push(obj);
            console.log("ohcl",response.data.data[instrument].ohlc.close)
        //   arr.push(res.data.data[instrument].last_price);
        }
        // console.log("this is arr", JSON.stringify(arr))
        return res.status(201).send((arr));
  
      } catch (err){
        return res.status(422).json({error : "Failed to send data"});
    }  
  
})

module.exports = router;

