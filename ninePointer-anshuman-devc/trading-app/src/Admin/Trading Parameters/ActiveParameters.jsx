import React,{useEffect, useState} from 'react'
import axios from "axios";

export default function ActiveParameters() {
    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/readAdminDetails")
        .then((res)=>{
            console.log("main data", res.data);
            let arr = res.data;
            let date = (new Date()).getDate() 
            if(date/10 < 1){
                date = '0' + date;
            }
            let ans = arr.filter((elem)=>{
                return elem.date === `${(new Date()).getFullYear()}-${(new Date()).getMonth()+1}-${date}`
            })
            setData(ans);

        })
    },[])


  return (
    <>
        <div>
            <h4>Previous Parameters</h4>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Trading amount</th>
                        <th>Allowed lots</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {data.map((elem)=>{
                        return(
                            <tr key={elem.uId}>
                                <td>{elem.uId}</td>                               
                                <td>{elem.date}</td>
                                <td>{elem.quantity}</td>
                                <td>{elem.amount}</td>
                                <td>{elem.allowedLot}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </>
  )
}

