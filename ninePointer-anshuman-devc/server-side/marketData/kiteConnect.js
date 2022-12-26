
// var KiteConnect = require('kiteconnect').KiteConnect;
// const express = require('express');
// const router = express.Router();
// const fetchData = require('./fetchToken');
// const { Server } = require('socket.io');
// const axios = require('axios');


// let eventEmitOnError ;

// let newCors = process.env.NODE_ENV === "production" ? "http://3.110.187.5/" : "http://localhost:3000"
// const io = new Server(9000, {
//   cors: {

//     origin: newCors,
//     // origin: "http://3.110.187.5/",

//     methods: ['GET', 'POST', 'PATCH'],
//   },
// });
// // let socket1 = '';
// io.on("connection", (socket) => {
//   console.log('client socket is' + socket.id);
//   // socket1 = socket;
//   socket.on('hi', (data) => {
//     eventEmitOnError = data;
//     // console.log(data);
//     parameters(io, socket);
//   });

// });

// async function parameters(io, socket) {
//   let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
//   let date = new Date();
//   let today = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`

//   console.log("inside function");
//   let getAccessToken;
//   let getApiKey;

//   try{
//     console.log("inside try 1");
//     let accessTokenResp = await axios.get(`${baseUrl}api/v1/readRequestToken`)
//     let apiKeyResp = await axios.get(`${baseUrl}api/v1/readAccountDetails`)

//     for(let elem of accessTokenResp.data){
//       for(let subElem of apiKeyResp.data){
//         console.log("inside 2");
//           if(elem.accountId === subElem.accountId && elem.generatedOn === today && elem.status === "Active" && subElem.status === "Active"){
//               getAccessToken = elem.accessToken;
//               getApiKey = subElem.apiKey
//           }
//       }
//     }

//     console.log(getAccessToken, getApiKey);

//   } catch(err) {
//     return new Error(err);
//   }

//   try{
//     console.log("inside try 2");
//     if(getApiKey !== undefined && getAccessToken !== undefined){
//       var api_key = getApiKey;

//       var options = {
//         api_key: api_key,
//         debug: false,
//       };
    
//       let kc = new KiteConnect(options);
//       console.log("key token", getApiKey, getAccessToken);
//       let token = await fetchData(getApiKey, getAccessToken);
//       console.log(token);
//       var KiteTicker = require('kiteconnect').KiteTicker;
//       var ticker = new KiteTicker({
//         api_key: getApiKey,
//         access_token: getAccessToken,
//       });
//       // console.log(ticker);
      
//       ticker.autoReconnect(true, 10000000000000, 5);
//       ticker.connect();
//       ticker.on('ticks', onTicks);
//       ticker.on('connect', subscribe);
//       ticker.on('connect', onConnect);
//       ticker.on('disconnect', onDisconnect);
//       ticker.on('error', onError);
//       ticker.on('close', onClose);
//       // ticker.on("order_update", onTrade)
//       ticker.on("noreconnect", function () {
//         ticker.disconnect();
//         console.log("noreconnect");
//       });
    
//       ticker.on('reconnecting', function (reconnect_interval, reconnections) {
//         console.log(
//           'Reconnecting: attempt - ',
//            reconnections,
//           ' innterval - ',
//           reconnect_interval
//         );
//       });
    
//       function onConnect() {
//         console.log('connected to zerodha');
//         console.log('socket id is' + socket.id);
//       }
    
//       function onTicks(ticks) {

//         if(token.length === ticks.length){
//           // console.log('Ticks', ticks);
//           socket.emit('tick', ticks);
//           // console.log(socket);
//         }
//       }
  
//       function onDisconnect(error) {
//         console.log('Closed connection on disconnect');
//       }
    
//       function subscribe() {
//         var items = token;
//         console.log('subscribe', ticker.subscribe(items));
//         ticker.setMode(ticker.modeFull, items);
//       }
    
//       async function orderUpdateFunc() {
//         // console.log("updated order", orderUpdate)
//       }
 
//       async function onError(error) {
//         try{
//           let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
//             let liveData = await axios.get(`${baseUrl}api/v1/getliveprice`)
//               let ticks = liveData.data
//               console.log(ticks);
//               socket.emit('tick', ticks);
              
//         } catch(err){
//           throw new Error(err)
//         }
//         console.log('Closed connection on error', error);
//         // console.log(eventEmitOnError);
//         // if(eventEmitOnError){
//         //   eventEmitOnError = false;
//         //   const data = "Incorrect access token or api key";
//         //   socket.emit('wrongToken', data);
//         // }

//       }
    
//       function onClose(reason) {
//         console.log('Closed connection on close', reason);
//       }
    
//       let orderUpdate3 = {};
//       async function onTrade(order) {
//         console.log('Order update', order);
//         const order2 = order;
    
//         orderUpdate3 = await order2;
//         await executerr(orderUpdate3);
//       }    

//     }
//     else{
//       console.log("no token");
//       const data = "Please enter a valid access token or api key";
//       socket.emit('noToken', data);
//     }

//   } catch (err){
//     throw new Error(err);
//   }

// }
// module.exports = parameters;



const express = require('express');
const router = express.Router();
const fetchData = require('./fetchToken');
const { Server } = require('socket.io');
const axios = require('axios');
var KiteTicker = require('kiteconnect').KiteTicker;
const RequestToken = require("../models/Trading Account/requestTokenSchema");
const Account = require("../models/Trading Account/accountSchema");



// function kiteTickerFunc(){

  let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
  let date = new Date();
  let today = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  let ticker;
  console.log("inside function");

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
 
     console.log(getAccessToken, getApiKey);
 
 
     ticker = new KiteTicker({
            // api_key: 'nq0gipdzk0yexyko',
            // access_token: 'SRsDbH6dcBo7kce85M3tagzOj5s4aGX5',
            api_key: getApiKey,
            access_token: getAccessToken,
          });
    
    
    let newCors = process.env.NODE_ENV === "production" ? "http://3.110.187.5/" : "http://localhost:3000"
    const io = new Server(9000, {
      cors: {
    
        origin: newCors,
        //  origin: "http://3.110.187.5/",
    
        methods: ['GET', 'POST', 'PATCH'],
      },
    });
    // let socket1 = '';
    io.on("connection", (socket) => {
      console.log('client socket is' + socket.id);
      // socket1 = socket;
      socket.on('hi', (data) => {
        eventEmitOnError = data;
        // console.log(data);
        parameters(io, socket, ticker);
      });
    
    });    
  },4000)


//   return ticker;
// }

// let ticker = kiteTickerFunc();
// console.log("ticker", ticker);

// console.log("ticker", ticker)
// let token;
async function tikerFunc(){
  // token = await fetchData(getApiKey, getAccessToken);

  //   var items = token;
  //   console.log("check tiker")
  //   console.log('subscribe', ticker.subscribe(items));
  //   ticker.setMode(ticker.modeFull, items);
  console.log(ticker)
  ticker.disconnect();
  ticker.connect();
  // ticker.reconnect();
  
}


async function parameters(io, socket, ticker) {

  try{
    console.log("inside try 2");
    console.log(ticker);
    // if(getApiKey !== undefined && getAccessToken !== undefined){
      // console.log("key token", getApiKey, getAccessToken);
      // let token = await fetchData(getApiKey, getAccessToken);
      let token = await fetchData(getApiKey, getAccessToken);
      // let token = await fetchData('nq0gipdzk0yexyko', 'SRsDbH6dcBo7kce85M3tagzOj5s4aGX5');
      // console.log("token", token);
      // var KiteTicker = require('kiteconnect').KiteTicker;
      // var ticker = new KiteTicker({
      //   api_key: getApiKey,
      //   access_token: getAccessToken,
      // });
      // console.log(ticker);
      
      ticker.autoReconnect(true, 10000000000, 5);
      ticker.connect();
      ticker.on('ticks', onTicks);
      ticker.on('connect', subscribe);
      ticker.on('connect', onConnect);
      ticker.on('disconnect', onDisconnect);
      ticker.on('error', onError);
      ticker.on('close', onClose);
      // ticker.on("order_update", onTrade)
      ticker.on("noreconnect", function () {
        ticker.disconnect();
        console.log("noreconnect");
      });
    
      ticker.on('reconnecting', function (reconnect_interval, reconnections) {
        console.log(
          'Reconnecting: attempt - ',
           reconnections,
          ' innterval - ',
          reconnect_interval
        );
      });
    
      function onConnect() {
        console.log('connected to zerodha');
        console.log('socket id is' + socket.id);
      }
    
      function onTicks(ticks) {
        // console.log('ticks', ticks);
        // var items = token;
        // console.log('subscribe', ticker.subscribe(items));
        // ticker.setMode(ticker.modeFull, items);

          console.log("token", token)
        if(token.length === ticks.length){
          console.log('Ticks', ticks);
          socket.emit('tick', ticks);
          // console.log(socket);
        } else{
          // ticker.close();
          // ticker.disconnect();
        }
      }
  
      function onDisconnect(error) {
        console.log('Closed connection on disconnect');
      }
    
      function subscribe() {

        // tikerFunc();
        var items = token;
        console.log('subscribe', ticker.subscribe(items));
        ticker.setMode(ticker.modeFull, items);
      }
    
      async function orderUpdateFunc() {
        // console.log("updated order", orderUpdate)
      }
 
      async function onError(error) {
        if(getApiKey !== undefined && getAccessToken !== undefined){
          try{
            console.log(error);
            let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
              let liveData = await axios.get(`${baseUrl}api/v1/getliveprice`)
                let ticks = liveData.data
                console.log('tick', ticks);
                socket.emit('tick', ticks);
          } catch(err){
            throw new Error(err)
          }
        }

        console.log('Closed connection on error', error);
        // console.log(eventEmitOnError);
        // if(eventEmitOnError){
        //   eventEmitOnError = false;
        //   const data = "Incorrect access token or api key";
        //   socket.emit('wrongToken', data);
        // }

      }
    
      function onClose(reason) {
        console.log('Closed connection on close', reason);
      }
    
      let orderUpdate3 = {};
      async function onTrade(order) {
        console.log('Order update', order);
        const order2 = order;
    
        orderUpdate3 = await order2;
        await executerr(orderUpdate3);
      }    

    // }
    // else{
      // console.log("no token");
      // const data = "Please enter a valid access token or api key";
      // socket.emit('noToken', data);
    // }

  } catch (err){
    throw new Error(err);
  }

}
module.exports = {parameters, tikerFunc};



