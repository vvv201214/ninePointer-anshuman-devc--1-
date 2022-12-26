import React, { useContext } from "react";
import {NavLink} from "react-router-dom";
import { userContext } from "../AuthContext";
import AlgoHeader from "./AlgoHeader";

function AlgoMain(){
    const getDetails = useContext(userContext);
    return(
        <>
            <div className="User_header">
            <h1 className="header_para">{`Hello ${getDetails.userDetails.name}! Welcome Back`}</h1>
                <button className="logo_btn" >ninepointer</button>
            </div>
            <AlgoHeader/>
        </>
    )
}
export default AlgoMain;