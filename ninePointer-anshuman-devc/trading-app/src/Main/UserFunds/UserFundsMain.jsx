import React, { useContext } from "react";
import { useEffect } from "react";
import { userContext } from "../AuthContext";
import FundsHeader from "./UserFundsHeader";

function UserFundsMain(){
    const getDetails = useContext(userContext);
    useEffect(()=>{
        console.log(getDetails)
    }, [])

    return(
        < >
            <div className="User_header">
            <h1 className="header_para">{`Hello ${getDetails.userDetails.name}! Welcome Back`}</h1>
                <button className="logo_btn" >ninepointer</button>
            </div>
            {/* <UserFundsHeader role = {getDetails.userDetails.role}/> */}
        </>
    )
}
export default UserFundsMain;