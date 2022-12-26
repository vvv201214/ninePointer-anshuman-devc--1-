import React from 'react'
import { useEffect } from 'react';
import axios from "axios";

function Checking(data){
    useEffect(()=>{
        // axios.get("http://localhost:8000/readBrokerage")
        // .then((res) => {
        //     console.log(res.data)
        // }).catch((err)=>{
        //     window.alert("Server Down");
        //     return new Error(err);
        // })
    },[])
    function hii(){
        console.log("hii this is checking wala function", data);
    }
    hii();
    return(
        <>
        </>
    )
}

export default Checking;
