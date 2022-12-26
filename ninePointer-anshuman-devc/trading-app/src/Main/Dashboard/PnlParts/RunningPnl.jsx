import React from 'react'
import { useEffect, useState } from 'react'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';  

export default function RunningPnl({marketData, tradeData, data, Render}) {
    let date = new Date();
    // let todayDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    // let fake_date = "1-12-2022"
    // const { reRender, setReRender } = Render;
    const [pnlData, setPnlData] = useState([]);
    let showTotal = true;
    const [liveDetail, setLiveDetail] = useState([])
    console.log("tradedata", tradeData);
    console.log("market data", marketData);
    useEffect(()=>{
        // axios.get("http://localhost:8000/usertradedata")
        // .then((res) => {
        //     let data = (res.data).filter((elem)=>{
        //         return elem.createdOn.includes(todayDate) && elem.status === "COMPLETE";
        //     })
            console.log(data);
            setPnlData(data);

            let hash = new Map();
            for(let i = data.length-1; i >= 0 ; i--){
                if(hash.has(data[i].symbol)){
                    let obj = hash.get(data[i].symbol);
                    if(Number(data[i].Quantity) + Number(obj.Quantity) === 0){
                        obj.average_price = 0;
                    }else{
                        obj.average_price = ((Number(obj.average_price) * Number(obj.Quantity)) 
                                        + (Number(data[i].average_price) * Number(data[i].Quantity)))/(Number(data[i].Quantity) 
                                        + Number(obj.Quantity));
                    }
                    obj.Quantity = Number(obj.Quantity) + Number(data[i].Quantity)
                    if(Number(obj.Quantity) > 0){
                        obj.buyOrSell = "BUY";
                    } else if((obj.Quantity) > 0){
                        obj.buyOrSell = "SELL"
                    } 

                } else{
                    hash.set(data[i].symbol, {
                        buyOrSell : data[i].buyOrSell,
                        Quantity : Number(data[i].Quantity),
                        average_price: Number(data[i].average_price),
                        Product: data[i].Product,
                        symbol: data[i].symbol
                    })
                }
            }

            console.log(hash);
            let runningPnl = [];
            for (let value of hash.values()){
                runningPnl.push(value);
            }


            setPnlData(runningPnl);

            let liveDetailsArr = [];
            runningPnl.map((elem)=>{
                tradeData.map((element)=>{
                    if(element.symbol === elem.symbol){
                        marketData.map((subElem)=>{
                            if(subElem !== undefined && subElem.instrument_token === element.instrumentToken){
                                console.log(subElem);
                                liveDetailsArr.push(subElem)
                            }
                        })
                    }
                })
            })

            setLiveDetail(liveDetailsArr);
        // })
    }, [marketData])

    console.log("this is pnl data", pnlData);
    console.log("live data", liveDetail);
    let Total = 0;
  return (
    <table className="grid1_table">
        <tr className="grid2_tr">
            <th className="grid2_th">Product</th>
            <th className="grid2_th">Instruments</th>
            <th className="grid2_th">Quantity</th>
            <th className="grid2_th">Avg. Price (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
            <th className="grid2_th">LTP (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
            <th className="grid2_th">P&L (<FontAwesomeIcon className='fa-xs' icon={faIndianRupeeSign} />)</th>
            <th className="grid2_th">%Change</th>
        </tr>
        {
            pnlData.map((elem, index)=>{

                elem.Quantity && (showTotal=false)
                Total += Number((
                    ((liveDetail[index]?.last_price)*(elem.Quantity)) - (elem.average_price*elem.Quantity)
                ))
                let updatedValue = (
                    ((liveDetail[index]?.last_price)*(elem.Quantity)) - (elem.average_price*elem.Quantity)
                    ).toFixed(2);

                return(
                <>
                    {elem.Quantity !== 0 &&
                    <tr className="grid2_tr"  style={updatedValue>=0 ? { color: "green"}: { color: "red"} } key={elem._id}>
                        <td className="grid2_td" style={{color : "black"}}>{elem.Product}</td>
                        <td className="grid2_td">{elem.symbol}</td>
                        <td className="grid2_td">{elem.Quantity}</td>
                        <td className="grid2_td">{(elem.average_price).toFixed(2)}</td>
                        <td className="grid2_td">{liveDetail[index]?.last_price.toFixed(2)}</td>
                        <td className="grid2_td">{(
                            ((liveDetail[index]?.last_price)*(elem.Quantity)) - (elem.average_price*elem.Quantity)
                        ).toFixed(2)}</td>
                        {liveDetail[index]?.change === undefined ?
                            <td className="grid2_td">{((liveDetail[index]?.last_price - elem.average_price)/(elem.average_price)).toFixed(2)}%</td>
                            :
                            <td className="grid2_td">{liveDetail[index]?.change.toFixed(2)}%</td>}
                    </tr>}
                </>
                )
            })
        }
        <tr>
            <th ></th>
            <th></th>
            <th></th>
            <th></th>
            {!showTotal && pnlData.length ?
            <>
            <th className='pnl_Total'>TOTAL</th>
            <th className='pnl_Total'style={Total>=0 ? {color: "green"} : {color: "red"} }>{Total.toFixed(2)}</th>
            </>
            :
            <th></th>
            }
            <th></th>
        </tr>
    </table>
  )
}


