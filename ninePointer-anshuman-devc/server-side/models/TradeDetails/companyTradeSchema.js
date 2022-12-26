const mongoose = require("mongoose");

const orderIdSchema = new mongoose.Schema({
    order_id:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    uId:{
        type: String,
        required : true
    },
    createdOn:{
        type: String,
        required : true
    },
    createdBy:{
        type: String,
        required : true
    },
    real_last_price:{
        type: Number,
        required : true
    },
    average_price:{
        type: Number,
        required: true
    },
    Quantity:{
        type: String,
        required: true
    },
    realInstrument:{
        type: String,
    },
    Product:{
        type: String,
        required: true
    },
    buyOrSell:{
        type: String,
        required: true
    },
    exchange_order_id:{
        type: String,
    },
    order_timestamp:{
        type: String,
        required: true
    },
    variety:{
        type: String,
        required: true
    },
    validity:{
        type: String,
        required: true
    },
    exchange:{
        type: String,
        required: true
    },
    exchange_timestamp:{
        type: String,
    },
    order_type:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    filled_quantity:{
        type: String,
        required: true
    },
    pending_quantity:{
        type: String,
        required: true
    },
    cancelled_quantity:{
        type: String,
        required: true
    },
    guid:{
        type: String,
        required: true
    },
    market_protection:{
        type: String,
        required: true
    },
    disclosed_quantity:{
        type: String,
        required: true
    },
    symbol:{
        type: String,
        required: true
    },
    placed_by:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true        
    },
    realBrokerage:{
        type: String,        
    },
    realAmount:{
        type: String,
        required: true        
    },
    tradeBy:{
        type: String,
        required: true        
    }
})

const orderidDetail = mongoose.model("company-trade-detail", orderIdSchema);
// const orderidDetail = mongoose.model("order-id-detail", orderIdSchema);
module.exports = orderidDetail;