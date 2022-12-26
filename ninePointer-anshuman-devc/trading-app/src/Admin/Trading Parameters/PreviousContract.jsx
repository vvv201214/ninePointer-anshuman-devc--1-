import React,{useEffect, useState} from 'react'
import axios from "axios";

export default function PreviousContracts() {
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
                return elem.date !== `${(new Date()).getFullYear()}-${(new Date()).getMonth()+1}-${date}`
            })
            setData(ans);
        })
    },[])

  return (
    <>
        <div>
            <h4>Previous Contracts</h4>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Date</th>
                        <th>Contract Date</th>
                        <th>Call/Put</th>
                        <th>Symbol</th>                       
                    </tr>
                </thead>
                
                    {data.map((elem, index)=>{
                        return(
                            <tbody key={index}>
                            <tr key={elem.uId}>
                                <td>{elem.uId}</td>                               
                                <td>{elem.date}</td>
                                <td>{elem.contractDate}</td>
                                <td>CE</td>
                                <td>{elem.ceTicker}</td>
                            </tr>
                            <tr key={`${elem.uId}v`}>
                                <td>{`${elem.uId}v`}</td>                               
                                <td>{elem.date}</td>
                                <td>{elem.contractDate}</td>
                                <td>PE</td>
                                <td>{elem.peTicker}</td>
                            </tr>
                            </tbody>
                            
                        )
                    })}
                
            </table>
        </div>
    </>
  )
}

