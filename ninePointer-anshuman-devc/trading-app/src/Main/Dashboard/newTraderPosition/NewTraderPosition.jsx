import React, { useContext, useState, useEffect } from "react";
import axios from "axios"
import OverallPnl from "../PnlParts/OverallPnl";
import RunningPnl from "../PnlParts/RunningPnl";
import ClosedPnl from "../PnlParts/ClosedPnl";
import TradersPNLTrader from "../PnlParts/TraderPNLTrader";
import { userContext } from "../../AuthContext";
import { io } from "socket.io-client";
import NewTradersTable from "./NewTradersTable";

export default function NewTraderPosition() {

    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:9000/"
    let socket;
    try{
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
            <NewTradersTable socket={socket}/>
        </div>

    )
}