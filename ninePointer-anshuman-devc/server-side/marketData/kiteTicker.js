const kiteTicker = require('kiteconnect').KiteTicker;
const fetchData = require('./fetchToken');
// const ticker = new kiteTicker({
//     api_key: nq0gipdzk0yexyko,
//     access_token: dRHu1ZYNP2J11JZOq4u3i0oXD7nM39vp, 
// });
let ticker;
const createNewTicker = (api_key, access_token) => {
    ticker = new kiteTicker({
        api_key,
        access_token 
    });

    ticker.connect();
    ticker.autoReconnect(true, 10000000000, 5);
    console.log('ticker is', ticker);
    return ticker;    
}

const disconnectTicker = (ticker) => {
    ticker.disconnect();
}

const subscribeTokens = async() => {
    console.log(ticker);
    const tokens = await fetchData('nq0gipdzk0yexyko','DKW7CYJN50QSnjgzahQ9UjJqPFrChzOh');
    let x =  ticker.subscribe(tokens);
    console.log("subscribed token", x, tokens);
}

const unSubscribeTokens = async(token) => {
    console.log("unsubscribe");
    let tokens = [];
    tokens.push(token)
    // const tokens = await fetchData('nq0gipdzk0yexyko','DKW7CYJN50QSnjgzahQ9UjJqPFrChzOh');
   let x =  ticker.unsubscribe(tokens);
   console.log("unsubscribed token", x, tokens);
}

module.exports = {createNewTicker, disconnectTicker, subscribeTokens, unSubscribeTokens};