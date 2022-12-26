import React from "react";
// import './CompanyPosition.css';
import { useEffect } from 'react';
import { io } from "socket.io-client";
import TraderPositionTable from "./TraderPositionTable";


function TraderPosition() {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:9000/"
    let socket;
    try{
        // socket = io.connect("http://localhost:9000/")
        socket = io.connect(`${baseUrl}`)

    } catch(err){
        throw new Error(err);
    }
    useEffect(()=>{
        console.log("rendering")
        console.log(socket);
        socket.on("connect", ()=>{
            console.log(socket.id);
            socket.emit("hi",true)
        })

        socket.on("noToken", (data)=>{
            console.log("no token");
            window.alert(data);
        })
        // socket.on("wrongToken", (data)=>{
        //     console.log("wrong Token");
        //     window.alert(data);
        // })
        }, []);

    return (
        <div>
            <TraderPositionTable socket={socket}/>
        </div>
    )
}
export default TraderPosition;
