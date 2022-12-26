
import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import axios from "axios";


export default function TradersPnlCompany({marketData, tradeData}) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
    
    const [userDetail, setUserDetail] = useState([]);
    const [allTrade, setAllTrade] = useState([]);

    let detailPnl = [];

    let date = new Date();
    let todayDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    // let fake_date = "2022-12-16";
    let fake_date = "16-12-2022";
    let totalPnl = 0;
    let transactionCost = 0;
    let numberOfTrade = 0;
    let lotUsed = 0;
    let runninglots = 0;
    let totalOverAllPnl = 0;
    let totalNumberTrade = 0;
    let totalLotsUsed = 0;
    let totalrunninglots = 0;
    let totalTransCost = 0;
    let totalNetPnl = 0;
    useEffect(()=>{
        axios.get(`${baseUrl}api/v1/readuserdetails`)
        .then((res) => {
            setUserDetail(res.data);
        }).catch((err)=>{
            return new Error(err);
        })

        axios.get(`${baseUrl}api/v1/readmocktradecompanyDate`)
        .then((res) => {
            // let data = (res.data).filter((elem) => {
            //     return elem.order_timestamp.includes(todayDate) && elem.status === "COMPLETE";
            // })
            setAllTrade(res.data);
        }).catch((err)=>{
            return new Error(err);
        })

    }, [marketData])
    userDetail.map((elem)=>{

        let data = allTrade.filter((element)=>{
            return elem.email === element.userId;
        })


        let hash = new Map();

        for(let i = data.length-1; i >= 0 ; i--){
            numberOfTrade += 1;
            transactionCost += Number(data[i].brokerage);
            if(hash.has(data[i].symbol)){
                let obj = hash.get(data[i].symbol);
                if(data[i].buyOrSell === "BUY"){
                    if(obj.totalBuy === undefined || obj.totalBuyLot === undefined){
                        obj.totalBuy = Number(data[i].average_price) * (Number(data[i].Quantity))
                        obj.totalBuyLot = (Number(data[i].Quantity))
                    } else{
                        obj.totalBuy = obj.totalBuy + Number(data[i].average_price) * (Number(data[i].Quantity))
                        obj.totalBuyLot = obj.totalBuyLot + (Number(data[i].Quantity)) 
                    }

                } if(data[i].buyOrSell === "SELL"){
                    if( obj.totalSell === undefined || obj.totalSellLot === undefined){

                        obj.totalSell = Number(data[i].average_price) * (Number(data[i].Quantity))
                        obj.totalSellLot = (Number(data[i].Quantity)) 
                    } else{

                        obj.totalSell = obj.totalSell + Number(data[i].average_price) * (Number(data[i].Quantity))
                        obj.totalSellLot = obj.totalSellLot + (Number(data[i].Quantity)) 
                    }

                }
            }  else{
                if(data[i].buyOrSell === "BUY"){
                    hash.set(data[i].symbol, {
                        totalBuy : Number(data[i].average_price) * (Number(data[i].Quantity)),
                        totalBuyLot : (Number(data[i].Quantity)) ,
                        totalSell: 0,
                        totalSellLot: 0,
                        symbol: data[i].symbol,
                        Product: data[i].Product,
                        name: data[0].createdBy
                    })
                }if(data[i].buyOrSell === "SELL"){
                    hash.set(data[i].symbol, {
                        totalSell : Number(data[i].average_price) * (Number(data[i].Quantity)),
                        totalSellLot : (Number(data[i].Quantity)) ,
                        totalBuy : 0,
                        totalBuyLot: 0,
                        symbol: data[i].symbol,
                        Product: data[i].Product,
                        name: data[0].createdBy
                    })
                }
            }
        }

        let overallPnl = [];
        for (let value of hash.values()){
            overallPnl.push(value);
        }
        let liveDetailsArr = [];
        overallPnl.map((elem)=>{
            tradeData.map((element)=>{
                if(element.symbol === elem.symbol){
                    marketData.map((subElem)=>{
                        if(subElem !== undefined && subElem.instrument_token === element.instrumentToken){
                            liveDetailsArr.push(subElem)
                        }
                    })
                }
            })
        })

        let name = "";
        overallPnl.map((elem, index)=>{
            name = elem.name;
            console.log(elem.totalBuy,elem.totalSell,elem.totalBuyLot,elem.totalSellLot, liveDetailsArr[index]?.last_price)
            totalPnl += (-(elem.totalBuy+elem.totalSell-(elem.totalBuyLot+elem.totalSellLot)*liveDetailsArr[index]?.last_price))
            lotUsed += Math.abs(elem.totalBuyLot) + Math.abs(elem.totalSellLot);
            runninglots += elem.totalBuyLot + elem.totalSellLot;
            console.log(runninglots);
        })

        let newObj = {
            brokerage: transactionCost,
            pnl: totalPnl,
            name: name,
            numberOfTrade: numberOfTrade,
            lotUsed: lotUsed,
            runninglots: runninglots
        }
        console.log(transactionCost, totalPnl, name, runninglots);
        detailPnl.push(JSON.parse(JSON.stringify(newObj)));
        transactionCost = 0;
        totalPnl = 0;
        numberOfTrade = 0;
        lotUsed = 0;
        runninglots = 0;
        // runninglots = 0;
    })

    // detailPnl.sort((a, b)=> {
    //     return b.pnl-a.pnl
    //   });

      detailPnl.sort((a, b)=> {
        return (b.pnl-b.brokerage)-(a.pnl-a.brokerage)
      });

    console.log(detailPnl);

  return (
    <div className="grid_2">
        <table className="grid1_table">
            <tr className="grid2_tr">
                <th className="grid2_th">Trader Name</th>
                <th className="grid2_th">Gross P&L</th>
                {/* <th className="grid2_th">Running PNL (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
                <th className="grid2_th">Closed PNL(<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th> */}
                <th className="grid2_th"># of Trades</th>
                <th className="grid2_th"> Running Lots</th>
                <th className="grid2_th"> Lots Used</th>
                <th className="grid2_th">Tran. Cost</th>
                <th className="grid2_th"> Net P&L</th>
            </tr>
            
            {

                detailPnl.map((elem, index)=>{
                    totalOverAllPnl += elem.pnl && elem.pnl;
                    totalNumberTrade += elem.numberOfTrade;
                    totalLotsUsed += elem.lotUsed;
                    totalTransCost += (elem.brokerage);
                    totalrunninglots += elem.runninglots;
                    
                    let netpnl = (elem.pnl - elem.brokerage);
                    totalNetPnl += netpnl;
                    return(
                        <>
                        {(elem.name !== "")  &&
                        <tr style={netpnl>=0.00 ? { color: "green"}:  { color: "red"}} key={elem._id}>
                            
                            <>
                            <td className="grid2_td" style={elem.runninglots === 0.00 ? {fontWeight:700, background : "#efebeb", borderRadius:5}:{fontWeight:700,background : "white"}}>{(elem.name)}</td>
                            {!elem.pnl ?
                            <td className="grid2_td">{elem.pnl > 0 ? "+₹" + (Number(elem.pnl)) : "-₹" +  ((-elem.pnl))} </td>
                            :
                            <td className="grid2_td">{elem.pnl > 0 ? "+₹" + (Number(elem.pnl).toFixed(2)) : "-₹" + ((-elem.pnl).toFixed(2))} </td>}
                            {/* <td className="grid2_td">Running PNL </td>
                            <td className="grid2_td">Closed PNL</td> */}
                            <td className="grid2_td">{elem.numberOfTrade}</td>
                            <td className="grid2_td">{elem.runninglots}</td>
                            <td className="grid2_td">{elem.lotUsed}</td>
                            <td className="grid2_td">₹{(elem.brokerage).toFixed(2)}</td>
                            {/* /* <td className="grid2_td">0.00</td> */}
                            <td className="grid2_td"> {netpnl > 0 ? "+₹" + (Number(netpnl).toFixed(2)).toLocaleString(undefined, {maximumFractionDigits:2,toFixed:2}) : "-₹" + ((-netpnl).toFixed(2)).toLocaleString(undefined, {maximumFractionDigits:2,toFixed:2})} </td>
                            </>
                          
                        </tr>
                        }
                       </>
                        
                    )
                })
            }
            <tr>
                <th className='pnl_Total'>Total</th>
                {detailPnl.length ? // ₹{totalOverAllPnl.toFixed(2)}
                <>
                <th className='pnl_Total'style={totalOverAllPnl>=0 ? {color: "green"} : {color: "red"} }>{totalOverAllPnl>=0 ? "+₹" + (totalOverAllPnl.toFixed(2)) : "-₹" + ((-totalOverAllPnl).toFixed(2))}</th>
                <th className='pnl_Total'>{totalNumberTrade}</th>
                <th className='pnl_Total'>{totalrunninglots}</th>
                <th className='pnl_Total'>{totalLotsUsed}</th>
                <th className='pnl_Total'>₹{totalTransCost.toFixed(2)}</th> 
                <th className='pnl_Total' style={totalNetPnl>=0 ? {color: "green"} : {color: "red"} }>{totalNetPnl>=0 ? "+₹" + (totalNetPnl.toFixed(2)) : "-₹" + ((-totalNetPnl).toFixed(2))}</th>
                </>
                :
                <th></th>
                 }
                
                <th></th>
                </tr> 
            
        </table>
    <button className="DetailsBtn">Details</button>
    </div>
  )
}
