import React,{useState, useContext} from 'react'
import "./adminStyle.css";
import { userContext } from './CreateContext';
import uniqueId from "uniqid";

export default function ApiPeramsForm(props) {
    const id = uniqueId();
    const [details, setDetails] = useState({
        name: "",
        active: "",
        lastUpdateOn: `${(new Date()).getDate()}-${(new Date()).getMonth()}-${(new Date()).getFullYear()}`,
        createdOn: `${(new Date()).getDate()}-${(new Date()).getMonth()}-${(new Date()).getFullYear()}`
    });

    async function submit(e){
        e.preventDefault();
        setDetails(details);
        const {name, active, lastUpdateOn, createdOn} = details

        const res = await fetch("http://localhost:8000/admin", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                name, active, lastUpdateOn, createdOn
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
                <label>Name</label>
                <input onChange={(e)=>{{details.name = e.target.value}}} type={"text"}/>
            </div>
            <br/>
            <div>
                <label>Active</label>
                <input onChange={(e)=>{{details.active = e.target.value}}} type={"radio"}/>
            </div>
            <br/>
           
            <br/><br/>
            <button className='btn' onClick={(e)=>{submit(e)}}>Submit</button>
            <button className='btn btn_back' onClick={(e)=>{props.showTotalDetails(true)}}>Back</button>
        </form>
    </div>
  )
}

