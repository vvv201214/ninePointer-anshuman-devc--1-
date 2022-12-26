import React,{useState, useContext} from 'react'
import { userContext } from './CreateContext';
import uniqueId from "uniqid";

export default function DetailForm(props) {
    const id = uniqueId();
    const [details, setDetails] = useState({
        index: "",
        date : "",
        pe: "",
        ce:"",
        contractDate:"",
        ceTicker:"",
        peTicker:"",
        enableTrade:"",
        quantity:"",
        allowedLot:"",
        amount:""
    });

    async function submit(e){
        e.preventDefault();
        setDetails(details);
        const {date, pe, ce, contractDate, ceTicker, peTicker, enableTrade, quantity, index, allowedLot, amount} = details

        const res = await fetch("http://localhost:8000/admin", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                date, pe, ce, contractDate, ceTicker, peTicker, enableTrade, quantity, uId:id, index, allowedLot, amount
            })
        });
        
        const data = await res.json();
        console.log(data);
        if(data.status === 422 || data.error || !data){
            window.alert(data.error);
            console.log("invalid entry");
        }else{
            window.alert("entry succesfull");
            console.log("entry succesfull");
            props.showTotalDetails(true);
        }
        console.log(details);
    }

  return (
    <div className='container'>
        <h4>Admin Detail Details</h4>
        <form method='POST'>
            <div>
                <label>Date</label>
                <input onChange={(e)=>{{details.date = e.target.value}}} type={"date"}/>
            </div>
            <br/>
            <div>
                <label>Index</label>
                <input onChange={(e)=>{{details.index = e.target.value}}} type={"text"}/>
            </div>
            <br/>
            <div>
                <label>PE</label>
                <input onChange={(e)=>{{details.pe = e.target.value}}} type={"text"}/>
            </div>
            <br/>
            <div>
                <label>CE</label>
                <input onChange={(e)=>{{details.ce = e.target.value}}} type={"text"}/>
            </div>
            <br/>
            <div>
                <label>Contract Date</label>
                <input onChange={(e)=>{{details.contractDate = e.target.value}}} type={"date"}/>
            </div>
            <br/>
            <div>
                <label>CE Ticker</label>
                <input onChange={(e)=>{{details.ceTicker = e.target.value}}} type={"text"}/>
            </div>
            <br/>
            <div>
                <label>PE Ticker</label>
                <input onChange={(e)=>{{details.peTicker = e.target.value}}} type={"text"}/>
            </div>
            <br/>
            <div>
                <label>Enable trade</label>
                <input onClick={(e)=>{{details.enableTrade = true}}} type={"radio"}/>
            </div>
            <br/>
            <div>
                <label>Quantity</label>
                <input onChange={(e)=>{{details.quantity = e.target.value}}} type={"number"}/>
            </div>
            <div>
                <label>Allowed lot</label>
                <input onChange={(e)=>{{details.allowedLot = e.target.value}}} type={"number"}/>
            </div>
            <div>
                <label>Amount</label>
                <input onChange={(e)=>{{details.amount = e.target.value}}} type={"number"}/>
            </div>
            <br/><br/>
            <button className='btn' onClick={(e)=>{submit(e)}}>Submit</button>
            <button className='btn btn_back' onClick={(e)=>{props.showTotalDetails(true)}}>Back</button>
        </form>
    </div>
  )
}

