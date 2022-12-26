import React from 'react'
import { useState } from 'react';
import "./LoginStyle.css";
import { useNavigate } from "react-router-dom";

export default function LogInForm() {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({
        userId : "",
        pass : ""
    });

    async function logInButton(e){
        e.preventDefault();
        setUserInfo(userInfo);
        console.log("form submitted", userInfo);
        
        const {userId, pass} = userInfo;

        const res = await fetch(`${baseUrl}api/v1/login`, {
            method: "POST",
            credentials:"include",
            headers: {
                "content-type" : "application/json",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify({
                userId, pass
            })
        });
        
        const data = await res.json();
        console.log(data);
        if(data.status === 422 || data.error || !data){
            window.alert(data.error);
            console.log("invalid user details");
        }else{
            window.alert("Login succesfull");
            console.log("entry succesfull");
            navigate("/main/dashboard");
        }
    }
  return (
    <>
        <div className="login_form">
            <h4 className='login_heading'>Log in to your Account</h4>
            <form className='sub_login_form' onSubmit={logInButton}>
                <input className='user_id' id='userID' placeholder='Enter Email ID' onChange={(e)=>{{userInfo.userId=e.target.value}}} type={"text"}/>
                <br/><br/>
                <input className='password' id='password' placeholder='Enter Password' onChange={(e)=>{{userInfo.pass = e.target.value}}} type={"password"}/> 
                <br/><br/>
                <div className='btn_forget'>
                    <button className='login_btn'>LogIn</button>
                </div>
            </form>   
        </div> 
    </>
  )
}
