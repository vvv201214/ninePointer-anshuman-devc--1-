import React, { useContext } from "react";
import { userContext } from "../AuthContext";
import UserHeader from "./UserHeader";


function UserMain(){
    const getDetails = useContext(userContext);
    return(
        <>
            <div className="User_header">
            <h1 className="header_para">{`Hello ${getDetails.userDetails.name}! Welcome Back`}</h1>
                <button className="logo_btn" >ninepointer</button>
            </div>
            <UserHeader/>
        </>
    )
}
export default UserMain;