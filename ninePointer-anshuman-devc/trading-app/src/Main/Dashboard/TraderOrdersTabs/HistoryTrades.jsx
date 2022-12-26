import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import CompanyOrderPegination from "../CompanyOrderTabs/CompanyOrderPegination/CompanyOrderPegination";

export default function HistoryTrades({info, setOrderCountHistoryUser}) {

    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

    let date = new Date();
    let todayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

    console.log(info)
    const [data, setData] = useState([]);

    const[showPerPage, setShowPerPage] = useState(50)
    const[pegination, setPegination] = useState({
        start:0,
        end:showPerPage,
    })

    const onPeginationOnChange= (start, end) => {
        setPegination({start : start, end: end,})

    }
    
    useEffect(()=>{
        console.log(info.role)
            axios.get(`${baseUrl}api/v1/readmocktradeuseremail/${info.email}`)
            .then((res)=>{
                
                setData((res.data));
                setOrderCountHistoryUser((res.data).length);
            }).catch((err)=>{
                window.alert("Server Down of ");
                return new Error(err);
            }) 
       
    }, [info])


    
    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <span className="grid1_span"></span>
                        <div className="grid_1">
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Timestamp</th>
                                    <th className="grid2_th">OrderID</th>
                                    <th className="grid2_th">Type</th>
                                    <th className="grid2_th">Instrument</th>
                                    <th className="grid2_th">Product</th>
                                    <th className="grid2_th">Quantity</th>
                                    <th className="grid2_th">Avg.Price</th>
                                    <th className="grid2_th">Trans. Cost</th>
                                    <th className="grid2_th">Status</th>
                                </tr>

                                {info.role === "user" ?
                                    data.slice(pegination.start,  pegination.end).map((elem) => {
                                        return (
                                            <tr className="grid2_tr" key={elem.guid}>
                                                <td className="grid2_td">{elem.order_timestamp}</td>
                                                <td className="grid2_td">{elem.order_id}</td>
                                                <td className="grid2_td" style={elem.buyOrSell == "BUY" ? { color: "#4184f3", backgroundColor: "#b3ccff", fontWeight: 700 } : { color: "red", backgroundColor: "#ffb3b3", fontWeight: 700 }}>{elem.buyOrSell}</td>
                                                <td className="grid2_td">{elem.symbol}</td>
                                                <td className="grid2_td">{elem.Product}</td>
                                                <td className="grid2_td" style={elem.Quantity > 0 ? { color: "#428BCA", backgroundColor: "#b3ccff", fontWeight: 700 } : { color: "red", backgroundColor: "#ffb3b3", fontWeight: 700 }}>{elem.Quantity}</td>
                                                <td className="grid2_td">₹{(elem.average_price).toFixed(2)}</td>
                                                <td className="grid2_td">₹{Number(elem.brokerage).toFixed(2)}</td>
                                                <td className="grid2_td" style={{ color: "#008000", backgroundColor: "#99ff99", fontWeight: 700 }}>{elem.status}</td>
                                            </tr>
                                        )
                                    })
                                    :
                                    data.slice(pegination.start,  pegination.end).map((elem) => {
                                        return (
                                            <tr className="grid2_tr" key={elem.guid}>
                                                <td className="grid2_td">{elem.order_timestamp}</td>
                                                <td className="grid2_td">{elem.order_id}</td>
                                                <td className="grid2_td" style={elem.buyOrSell == "BUY" ? { color: "#428BCA", backgroundColor: "#b3ccff" } : { color: "red", backgroundColor: "#ffb3b3" }}>{elem.buyOrSell}</td>
                                                <td className="grid2_td">{elem.symbol}</td>
                                                <td className="grid2_td">{elem.Product}</td>
                                                <td className="grid2_td" style={elem.Quantity > 0 ? { color: "#428BCA", backgroundColor: "#b3ccff", fontWeight: 700 } : { color: "red", backgroundColor: "#ffb3b3", fontWeight: 700 }}>{elem.Quantity}</td>
                                                <td className="grid2_td">₹{(elem.average_price).toFixed(2)}</td>
                                                <td className="grid2_td">₹{Number(elem.brokerage).toFixed(2)}</td>
                                                <td className="grid2_td" style={{ color: "#008000", backgroundColor: "#99ff99", fontWeight: 700 }}>{elem.status}</td>
                                            </tr>
                                        )
                                    })}
                            </table>
                            <CompanyOrderPegination showPerPage={showPerPage} 
                            onPeginationOnChange={onPeginationOnChange}
                            total={data.length}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}