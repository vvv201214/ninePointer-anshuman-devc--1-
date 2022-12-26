import React, { useContext } from "react";
import { useState } from "react";
import './CompanyPosition.css';
import ByModal from './ByModal';
import SellModel from "./SellModel";
import { useEffect } from 'react';
import axios from "axios"
import { userContext } from "../../AuthContext";
import RunningPnl from "../PnlParts/RunningPnl";
import ClosedPnl from "../PnlParts/ClosedPnl";
import OverallPnl from "../PnlParts/OverallPnl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import TradersPnlCompany from "../PnlParts/TradersPnlCompany";

function CompanyPositionTable({ socket }) {
    const getDetails = useContext(userContext);
    const setDetails = useContext(userContext);
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
    
    const [tradeData, setTradeData] = useState([]);
    const [reRender, setReRender] = useState(true);
    const [marketData, setMarketData] = useState([]);
    const [data, setData] = useState([]);
    let date = new Date();
    let todayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    let fake_date = "16-12-2022"
    useEffect(() => {

        axios.get(`${baseUrl}api/v1/readmocktradecompanyDate`)
            .then((res) => {
                // let data = (res.data).filter((elem) => {
                //     return elem.order_timestamp.includes(todayDate) && elem.status === "COMPLETE";
                // })
                console.log("data", res.data)
                setData(res.data);
            }).catch((err) => {
                return new Error(err);
            })

        axios.get(`${baseUrl}api/v1/getliveprice`)
            .then((res) => {
                console.log("live price data", res)
                setMarketData(res.data);
                // setDetails.setMarketData(data);
            }).catch((err) => {
                return new Error(err);
            })

        axios.get(`${baseUrl}api/v1/readInstrumentDetails`)
            .then((res) => {
                let dataArr = (res.data).filter((elem) => {
                    return elem.status === "Active"
                })
                setTradeData(dataArr)
            }).catch((err) => {

                return new Error(err);
            })
        console.log("hii");

        socket.on("tick", (data) => {
            console.log("this is live market data", data);
            setMarketData(data);
            // setDetails.setMarketData(data);
        })


        console.log(marketData);
        console.log(tradeData);
        // reRender ? setReRender(false) : setReRender(true)
        // setReRender(true);
    }, [getDetails])
    console.log(marketData);
    useEffect(() => {
        return () => {
            console.log('closing');
            socket.close();
        }
    }, [])


    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <span className="grid1_span">Instruments Details</span>
                        <div className="grid_1">
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Trading Date</th>
                                    <th className="grid2_th">Contract Date</th>
                                    <th className="grid2_th"> Symbol</th>
                                    <th className="grid2_th"> Instrument</th>
                                    <th className="grid2_th">LTP</th>
                                    <th className="grid2_th">Change(%)</th>
                                    <th className="grid2_th">Action</th>
                                </tr>
                                {tradeData.map((elem, index) => {
                                    let updatedMarketData = marketData.filter((subElem) => {
                                        return elem.instrumentToken === subElem.instrument_token;
                                    })
                                    return (
                                        <tr className="grid1_table">
                                            <td className="grid2_td">{todayDate}</td>
                                            <td className="grid2_td">{elem.contractDate}</td>
                                            <td className="grid2_td">{elem.symbol}</td>
                                            <td className="grid2_td">{elem.instrument}</td>
                                            {(updatedMarketData[0]?.last_price) === undefined ?
                                            <td className="grid2_td">₹{(updatedMarketData[0]?.last_price)}</td>
                                            :
                                            <td className="grid2_td">₹{(updatedMarketData[0]?.last_price).toFixed(2)}</td>}

                                            {console.log(updatedMarketData[0], updatedMarketData[0]?.change)}
                                            {(updatedMarketData[0]?.change === undefined) ?
                                                <td className="grid2_td">{(Math.abs((updatedMarketData[0]?.last_price - updatedMarketData[0]?.average_price) / updatedMarketData[0]?.average_price)).toFixed(2)}%</td>
                                                :
                                                <td className="grid2_td">{updatedMarketData[0]?.change.toFixed(2)}%</td>}
                                            <td className="grid2_th companyPosition_BSbtn2">
                                                <div className="companyPosition_BSbtn">
                                                    <ByModal symbol={elem.instrument} ltp={(updatedMarketData[0]?.last_price)} maxlot={(elem.maxLot)} lotsize={(elem.lotSize)} Render={{ setReRender, reRender }} marketData={marketData} uIdProps={elem.uId} isCompany={true} />
                                                    <SellModel symbol={elem.instrument} ltp={(updatedMarketData[0]?.last_price)} maxlot={(elem.maxLot)} lotsize={(elem.lotSize)} Render={{ setReRender, reRender }} marketData={marketData} uIdProps={elem.uId} isCompany={true} />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                        <span className="grid2_span">Overall P&L-Company(Mock)</span>
                        <div className="grid_2">
                            <OverallPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div>
                        
                        {/* <span className="grid2_span">Running PNL-Company</span>
                        <div className="grid_2">
                            <RunningPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div>
                        <span className="grid2_span">Closed Trades PNL-Company</span>
                        <div className="grid_2">
                            <ClosedPnl marketData={marketData} tradeData={tradeData} data={data} />
                        </div> */}
                        <span className="grid2_span">Traders PNL-Company(Mock)</span>
                            <TradersPnlCompany marketData={marketData} tradeData={tradeData}/>          
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CompanyPositionTable;