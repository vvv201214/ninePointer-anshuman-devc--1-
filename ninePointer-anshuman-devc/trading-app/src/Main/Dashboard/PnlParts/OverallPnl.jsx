import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faContactCard, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';  

export default function OverallPnl({marketData, tradeData, data}) {

    let date = new Date();
    let todayDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}` ;
    let fake_date = "1-12-2022"
    // let [totalTransactionCost, setTotalTransactionCost] = useState(0);
    let totalTransactionCost = 0;
    const [overallPnlArr, setOverallPnlArr] = useState([]);
    const [liveDetail, setLiveDetail] = useState([]);
    const [avgPrice, setAvgPrice] = useState([]);

    var Total = 0;
    let avgPriceArr = [];
    let liveDetailsArr = [];
    let overallPnl = [];
    
    useEffect(()=>{

        console.log(data);
        let AvgPriceHash = new Map();
        avgPriceArr.push(data[0])
        for(let i = 0; i < data.length; i++){
            if(avgPriceArr[avgPriceArr.length-1].symbol !== data[i].symbol){
                avgPriceArr.push(data[i]);
                break;
            }
        }
        setAvgPrice(avgPriceArr)
        console.log("avgPriceArr", avgPriceArr);
        

        let hash = new Map();

        for(let i = data.length-1; i >= 0 ; i--){
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


                    console.log("obj.totalBuy", obj.totalBuy, "totalBuyLot", obj.totalBuyLot)
                } if(data[i].buyOrSell === "SELL"){
                    if( obj.totalSell === undefined || obj.totalSellLot === undefined){

                        obj.totalSell = Number(data[i].average_price) * (Number(data[i].Quantity))
                        obj.totalSellLot = (Number(data[i].Quantity)) 
                    } else{

                        obj.totalSell = obj.totalSell + Number(data[i].average_price) * (Number(data[i].Quantity))
                        obj.totalSellLot = obj.totalSellLot + (Number(data[i].Quantity)) 
                    }

                    console.log("obj.totalSell", obj.totalSell, "totalSellLot", obj.totalSellLot)
                }
            }  else{
                if(data[i].buyOrSell === "BUY"){
                    hash.set(data[i].symbol, {
                        totalBuy : Number(data[i].average_price) * (Number(data[i].Quantity)),
                        totalBuyLot : (Number(data[i].Quantity)) ,
                        totalSell: 0,
                        totalSellLot: 0,
                        symbol: data[i].symbol,
                        Product: data[i].Product
                    })
                }if(data[i].buyOrSell === "SELL"){
                    hash.set(data[i].symbol, {
                        totalSell : Number(data[i].average_price) * (Number(data[i].Quantity)),
                        totalSellLot : (Number(data[i].Quantity)) ,
                        totalBuy : 0,
                        totalBuyLot: 0,
                        symbol: data[i].symbol,
                        Product: data[i].Product
                    })
                }
            }
        }
        console.log(hash);
    
        
        for (let value of hash.values()){
            overallPnl.push(value);
        }

        
        overallPnl.map((elem)=>{
            console.log("52");
            tradeData.map((element)=>{
                console.log("53");
                if(element.symbol === elem.symbol){
                    console.log("line 54");
                    marketData.map((subElem)=>{
                        if(subElem !== undefined && subElem.instrument_token === element.instrumentToken){
                            console.log(subElem);
                            liveDetailsArr.push(subElem)
                        }
                    })
                }
            })
        })


        setOverallPnlArr(overallPnl);
        console.log("details array", overallPnl);

        setLiveDetail(liveDetailsArr);

        console.log(liveDetailsArr);

        // reRender ? setReRender(false) : setReRender(true)

    }, [marketData, data])

    data.map((elem)=>{
        totalTransactionCost += Number(elem.brokerage);
    })
    console.log("totalTransactionCost", totalTransactionCost, avgPrice, liveDetail);

  return (
        <table className="grid1_table">
            <tr className="grid2_tr">
                <th className="grid2_th">Product</th>
                <th className="grid2_th">Instrument</th>
                <th className="grid2_th">Quantity</th>
                <th className="grid2_th">Avg. Price</th>
                <th className="grid2_th">LTP</th>
                <th className="grid2_th">Gross P&L</th>
                <th className="grid2_th">Change(%)</th>
            </tr> 
            {
            overallPnlArr.map((elem, index)=>{


                let tempavgPriceArr = avgPrice.filter((element)=>{
                    return elem.symbol === element.symbol;
                })

                Total += (-(elem.totalBuy+elem.totalSell-(elem.totalBuyLot+elem.totalSellLot)*liveDetail[index]?.last_price))

                console.log(typeof(Total));

                let updatedValue = (-(elem.totalBuy+elem.totalSell-(elem.totalBuyLot+elem.totalSellLot)*liveDetail[index]?.last_price));
                // updatedValue = updatedValue.toFixed(2);
                console.log(updatedValue);
                console.log((-updatedValue).toLocaleString(undefined, {maximumFractionDigits:2}));
                return(
                    <>
                    <tr className="grid2_tr" style={updatedValue>=0.00 ? { color: "green"}:  { color: "red"}} key={index}>
                        <td className="grid2_td" style={{color : "black"}}>{elem.Product}</td>
                        <td className="grid2_td">{elem.symbol}</td>
                        <td className="grid2_td">{elem.totalBuyLot + elem.totalSellLot}</td>
                        <td className="grid2_td">₹{tempavgPriceArr[0].average_price.toFixed(2)}</td>
                        
                        {(liveDetail[index]?.last_price) === undefined ?
                        <td className="grid2_td">₹{(liveDetail[index]?.last_price)}</td>
                        :
                        <td className="grid2_td">₹{(liveDetail[index]?.last_price).toFixed(2)}</td>}
                        {/* <td className="grid2_td">{(-(elem.totalBuy+elem.totalSell-(elem.totalBuyLot+elem.totalSellLot)*liveDetail[index]?.last_price)).toFixed(2)}</td> */}
                        <td className="grid2_td">{updatedValue > 0.00 ? "+₹" + (updatedValue.toFixed(2)): "-₹" + ((-updatedValue).toFixed(2))}</td>
                        {liveDetail[index]?.change === undefined ?
                        <td className="grid2_td">{(Math.abs((liveDetail[index]?.last_price-liveDetail[index]?.average_price)/liveDetail[index]?.average_price)).toFixed(2)}%</td>//{((liveDetail[index]?.last_price - elem.average_price)/(elem.last_price)).toFixed(2)}
                        :
                        <td className="grid2_td">{liveDetail[index]?.change.toFixed(2)}%</td>}

                    </tr>
                    </>             
                )
            })   
            }

           <tr>
                <th></th>
                <th></th>
                {overallPnlArr.length ?
                <>
                <th className='pnl_Total'>Transaction Cost</th>
                <th className='pnl_Total'>₹{totalTransactionCost.toFixed(2)}</th>
                <th className='pnl_Total'>Gross P&L</th>
                <th className='pnl_Total' style={Total>=0 ? {color: "green"} : {color: "red"} }>{Total>=0 ? "+₹" + (Total.toFixed(2)) : "-₹" + ((-Total).toFixed(2))}</th>
                <th className='pnl_Total' style={(Total-totalTransactionCost)>=0 ? {color: "green"} : {color: "red"} }>Net P&L : {(Total-totalTransactionCost)>=0 ? "+₹" + ((Total-totalTransactionCost).toFixed(2)) : "-₹" + ((-(Total-totalTransactionCost)).toFixed(2))}</th>
                </>
                : // {(Total-totalTransactionCost).toFixed(2)}
                <th></th>
                }
                
                <th></th>
                </tr> 
        </table>
  )
}



