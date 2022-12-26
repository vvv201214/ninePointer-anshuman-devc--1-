const express = require('express');
const router = express.Router();
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
// const kiteConnect = require('./marketData/kiteConnect');
const fetch = require('./marketData/placeOrder');
app.use(require("cookie-parser")());
const fetchData = require('./marketData/fetchToken');
const io = require('./marketData/socketio');
const {createNewTicker, disconnectTicker} = require('./marketData/kiteTicker');
const accessTokenAndapikey = ( require("./marketData/getAccessTokenAndKey"));

app.use(accessTokenAndapikey);

console.log(process.env.ACCESS_TOKEN, process.env.API_KEY)


const ticker = createNewTicker(process.env.API_KEY,process.env.ACCESS_TOKEN);
io.on("connection", (socket) => {
  console.log('client socket is' + socket.id);
  // socket1 = socket;
  socket.on('hi', async (data) => {
    // eventEmitOnError = data;
    let tokens = await fetchData(process.env.API_KEY, process.env.ACCESS_TOKEN);
    console.log('tokens index', tokens);
    ticker.subscribe(tokens);
    ticker.setMode(ticker.modeFull, tokens);
    ticker.on('ticks', (ticks) => {
      console.log('ticking');
      console.log('tick', ticks);
      if(ticks.length === tokens.length){
        console.log('sending ticks', ticks);
        socket.emit('tick', ticks); 
      }
    });
    ticker.on('error', (error)=>{
      console.log(error);
    });
    // console.log(data);
  });
});

io.on('disconnection', () => {disconnectTicker(ticker)});

dotenv.config({ path: './config.env' });

// console.log(kiteConnect);
// app.get('/api/v1/ws', kiteConnect.parameters);
app.get('/api/v1/data', fetch);

// app.get('/ws', kiteConnect);
// app.get('/data', fetch);
let newCors = process.env.NODE_ENV === "production" ? "http://3.110.187.5/" : "http://localhost:3000"
app.use(cors({
  credentials:true,

  // origin: "http://3.110.187.5/"
  origin: newCors

}));

app.use(express.json());

app.use('/api/v1', require("./marketData/livePrice"));
app.use('/api/v1', require("./routes/user/userLogin"));
app.use('/api/v1', require('./routes/TradeData/getUserTrade'));
app.use('/api/v1', require('./routes/TradeData/getCompanyTrade'));
app.use('/api/v1', require('./routes/AlgoBox/exchangeMappingAuth'));
app.use('/api/v1', require('./routes/AlgoBox/instrumentAlgoAuth'));
app.use('/api/v1', require('./routes/AlgoBox/productMappingAuth'));
app.use('/api/v1', require('./routes/AlgoBox/tradingAlgoAuth'));
app.use('/api/v1', require("./marketData/getRetrieveOrder"));
app.use('/api/v1', require('./marketData/placeOrder'));
app.use('/api/v1', require('./routes/instrument/instrumentAuth'));
app.use('/api/v1', require('./routes/TradingAccountAuth/accountAuth'));
app.use('/api/v1', require('./routes/TradingAccountAuth/brokerageAuth'));
app.use('/api/v1', require('./routes/TradingAccountAuth/parameterAuth'));
app.use('/api/v1', require('./routes/TradingAccountAuth/requestTokenAuth'));
app.use('/api/v1', require('./routes/user/userDetailAuth'));
app.use('/api/v1', require("./routes/user/everyoneRoleAuth"));
app.use('/api/v1', require("./routes/user/permissionAuth"));
app.use('/api/v1', require("./routes/mockTrade/mockTradeUserAuth"));
app.use('/api/v1', require("./routes/mockTrade/mockTradeCompanyAuth"));
require('./db/conn');

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! Shutting Down...');
  server.close(() => {
    process.exit(1);
  });
});

const PORT = 8000;

app.listen(PORT);
