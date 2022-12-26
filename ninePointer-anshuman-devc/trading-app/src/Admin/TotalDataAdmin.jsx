import React,{useEffect, useState} from 'react'
import axios from "axios";

export default function TotalDataAdmin() {
    const [data, setData] = useState([]);
    const [letestData, setLetestData] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8000/readAdminDetails")
        .then((res)=>{
            console.log("main data", res.data);
            setData(res.data);

            let arr = data.filter((elem)=>{
                return elem.date === data[0].date;
            })
            console.log("filterd",arr);
            setLetestData([...arr]);

        })
        
        // let arr2 = data.filter((elem)=>{
        //     return elem.date !== data[0].date;
        // })
        // setData([...arr2]);
    },[])


  return (
    <>
        <div>
            <h4>Letest data</h4>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Index</th>
                        <th>Date</th>
                        <th>CE</th>
                        <th>PE</th>
                        <th>Contract Date</th>
                        <th>CE Ticker</th>
                        <th>PE Ticker</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {letestData.map((elem)=>{
                        return(
                            <tr key={elem.uId}>
                                <td>{elem.uId}</td>
                                <td>{elem.index}</td>
                                <td>{elem.date}</td>
                                <td>{elem.ce}</td>
                                <td>{elem.pe}</td>
                                <td>{elem.contractDate}</td>
                                <td>{elem.ceTicker}</td>
                                <td>{elem.peTicker}</td>
                                <td>{elem.quantity}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        <br/><br/>
        <div>
            <h4>Detail History</h4>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Index</th>
                        <th>Date</th>
                        <th>CE</th>
                        <th>PE</th>
                        <th>Contract Date</th>
                        <th>CE Ticker</th>
                        <th>PE Ticker</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((elem)=>{
                        return(
                            <tr key={elem.uId}>
                                <td>{elem.uId}</td>
                                <td>{elem.index}</td>
                                <td>{elem.date}</td>
                                <td>{elem.ce}</td>
                                <td>{elem.pe}</td>
                                <td>{elem.contractDate}</td>
                                <td>{elem.ceTicker}</td>
                                <td>{elem.peTicker}</td>
                                <td>{elem.quantity}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </>
  )
}
