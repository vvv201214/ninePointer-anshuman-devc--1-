const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const userDetailSchema = new mongoose.Schema({
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
    lastModified:{
        type: String,
        required : true
    },
    createdBy:{
        type: String,
        required : true
    },
    name:{
        type: String,
        required : true
    },
    designation:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    degree:{
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    trading_exp:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    last_occupation:{
        type: String,
        required: true
    },
    joining_date:{
        type: String,
    },
    role:{
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    userId: {
        type: String,
              
    }
})

// generating jwt token
userDetailSchema.methods.generateAuthToken = async function(){
    try{
        // let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
        let token = jwt.sign({_id: this._id}, "NINEPOINTER");
        this.tokens = this.tokens.concat({token: token});
        return token;
    } catch (err){
        console.log(err);
    }
}

const userPersonalDetail = mongoose.model("user-personal-detail", userDetailSchema);
module.exports = userPersonalDetail;

