import React, { useContext } from "react";
import { userContext } from "../AuthContext";
import "./TradingAccounts.css";
import TradingHeader from "./TradingHeader";

function TradingACMain(){
    const getDetails = useContext(userContext);
    return(
        <>
            <div className="User_header">
                <h1 className="header_para">{`Hello ${getDetails.userDetails.name}! Welcome Back`}</h1>
                <button className="logo_btn" >ninepointer</button>
            </div>
            <TradingHeader/>
        </>
    )
}
export default TradingACMain;