import React, { useContext } from "react";
import { userContext } from "../AuthContext";
import InstrumentHeader from "./InstrumentHeader";

function InstrumentsMain(){
    const getDetails = useContext(userContext);
    return(
        <>
            <div className="User_header">
            <h1 className="header_para">{`Hello ${getDetails.userDetails.name}! Welcome Back`}</h1>
                <button className="logo_btn" >ninepointer</button>
            </div>
            <InstrumentHeader/>
        </>
    )
}
export default InstrumentsMain;