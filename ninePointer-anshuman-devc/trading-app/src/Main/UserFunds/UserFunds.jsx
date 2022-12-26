import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Styles from "./UserFunds.module.css";
import axios from "axios";
import { userContext } from "../AuthContext";

export default function Funds() {
    const getDetails = useContext(userContext);
    const [userDetail, setUserDetail] = useState([]);
    const [userTradeDetails, setUserTradeDetails] = useState([]);
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
    let [firstDate, setFirstDate] = useState("");
    const [selectUserState, setSelectUserState] = useState("All User");
    let secondDate = "";
    let userId = (getDetails.userDetails.role === "user") && getDetails.userDetails.email;

    let detailPnl = [];
    let totalPnl = 0;
    let transactionCost = 0;
    let numberOfTrade = 0;
    let lotUsed = 0;
    let name = "";

    useEffect(()=>{
        axios.get(`${baseUrl}api/v1/readuserdetails`)
        .then((res) => {
            setUserDetail(res.data);
        }).catch((err)=>{
            return new Error(err);
        })
    }, [getDetails])

    function firstDateChange(e){
        e.preventDefault();
        setFirstDate((e.target.value));

    }

    function secondDateChange(e){
        e.preventDefault();
        console.log(userDetail)
        let firstDateSplit = (firstDate).split("-");
        firstDate = `${firstDateSplit[0]}-${firstDateSplit[1]}-${firstDateSplit[2]}`
        setFirstDate(firstDate);
        console.log(firstDate);
        let secondDateSplit = (e.target.value).split("-");
        secondDate = `${secondDateSplit[0]}-${secondDateSplit[1]}-${secondDateSplit[2]}`

        console.log(firstDate ,secondDate);
        console.log(firstDate < secondDate);

        if(getDetails.userDetails.role === "user"){
            axios.get(`${baseUrl}api/v1/readmocktradeuseremail/${userId}`)
            .then((res) => {
                let filteredData = (res.data).filter((elem)=>{
                    let timeStamp = elem.order_timestamp;
                    let oneDateSplit = (timeStamp).split(" ");
                    let twoDateSplit = oneDateSplit[0].split("-");
                    timeStamp = `${twoDateSplit[2]}-${twoDateSplit[1]}-${twoDateSplit[0]}`

                    return timeStamp >= firstDate && timeStamp <= secondDate;
                })
                console.log(filteredData);
                if(Number(firstDateSplit[2]) <= Number(secondDateSplit[2])){
                    while(Number(firstDateSplit[2]) <= Number(secondDateSplit[2])){
                        // let firstDateDigit = Number(firstDateSplit[2]);
                        // let secondDateDigit = Number(secondDateSplit[2]);
                        let singleDateData = filteredData.filter((elem)=>{
                            let splitting = (elem.order_timestamp).split(" ");
                            return splitting[0] === (`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`)
                        })
                        
                        console.log(singleDateData, `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`);
                        let newObj = pnlCalculation(singleDateData);
                        newObj.date = `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`;
    
                        console.log(newObj);
                        if(newObj.numberOfTrade){
                            detailPnl.push(JSON.parse(JSON.stringify(newObj)));
                        }
                        
                        transactionCost = 0;
                        totalPnl = 0;
                        numberOfTrade = 0;
                        lotUsed = 0;
                    
                        console.log(detailPnl);
                        
                        (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                    }
                } else{
                    while(Number(firstDateSplit[2]) <= 31){
                        // let firstDateDigit = Number(firstDateSplit[2]);
                        // let secondDateDigit = Number(secondDateSplit[2]);
                        let singleDateData = filteredData.filter((elem)=>{
                            let splitting = (elem.order_timestamp).split(" ");
                            return splitting[0] === (`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`)
                        })
                        console.log(filteredData);
                        console.log(singleDateData, `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`);
                        let newObj = pnlCalculation(singleDateData);
                        newObj.date = `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`;
    
                        console.log(newObj);
                        if(newObj.numberOfTrade){
                            detailPnl.push(JSON.parse(JSON.stringify(newObj)));
                        }
                        
                        transactionCost = 0;
                        totalPnl = 0;
                        numberOfTrade = 0;
                        lotUsed = 0;
                    
                        console.log(detailPnl);
                        
                        (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                    }

                    (firstDateSplit[2]) = 1;
                    (firstDateSplit[1]) = Number(firstDateSplit[1]) + 1;
                    while(Number(firstDateSplit[2]) <= (secondDateSplit[2])){
                        // let firstDateDigit = Number(firstDateSplit[2]);
                        // let secondDateDigit = Number(secondDateSplit[2]);
                        let singleDateData = filteredData.filter((elem)=>{
                            let splitting = (elem.order_timestamp).split(" ");
                            return splitting[0] === (`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`)
                        })
                        console.log(filteredData);
                        console.log(singleDateData, `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`);
                        let newObj = pnlCalculation(singleDateData);
                        newObj.date = `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`;
    
                        console.log(newObj);
                        if(newObj.numberOfTrade){
                            detailPnl.push(JSON.parse(JSON.stringify(newObj)));
                        }
                        
                        transactionCost = 0;
                        totalPnl = 0;
                        numberOfTrade = 0;
                        lotUsed = 0;
                    
                        console.log(detailPnl);
                        
                        (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                    }
                }

            }).catch((err)=>{
                return new Error(err);
            })
        } else if(getDetails.userDetails.role === "admin"){
            if(selectUserState === "All User"){

                axios.get(`${baseUrl}api/v1/readmocktradeuser`)
                .then((res) => {
                    let filteredData = (res.data).filter((elem)=>{
                        let timeStamp = elem.order_timestamp;
                        let oneDateSplit = (timeStamp).split(" ");
                        let twoDateSplit = oneDateSplit[0].split("-");
                        timeStamp = `${twoDateSplit[2]}-${twoDateSplit[1]}-${twoDateSplit[0]}`

                        return timeStamp >= firstDate && timeStamp <= secondDate;
                    })
                    console.log(filteredData);
                    if(Number(firstDateSplit[2]) <= Number(secondDateSplit[2])){
                        while(Number(firstDateSplit[2]) <= Number(secondDateSplit[2])){
                            // let firstDateDigit = Number(firstDateSplit[2]);
                            // let secondDateDigit = Number(secondDateSplit[2]);
                            let singleDateData = filteredData.filter((elem)=>{
                                let splitting = (elem.order_timestamp).split(" ");
                                return splitting[0] === (`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`)
                            })
                            
                            console.log(singleDateData, `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`);
                            let newObj = pnlCalculation(singleDateData);
                            newObj.date = `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`;
        
                            console.log(newObj);
                            if(newObj.numberOfTrade){
                                detailPnl.push(JSON.parse(JSON.stringify(newObj)));
                            }
                            
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                        
                            console.log(detailPnl);
                            
                            (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                        }
                    } else{
                        while(Number(firstDateSplit[2]) <= 31){
                            // let firstDateDigit = Number(firstDateSplit[2]);
                            // let secondDateDigit = Number(secondDateSplit[2]);
                            let singleDateData = filteredData.filter((elem)=>{
                                let splitting = (elem.order_timestamp).split(" ");
                                return splitting[0] === (`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`)
                            })
                            console.log(filteredData);
                            console.log(singleDateData, `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`);
                            let newObj = pnlCalculation(singleDateData);
                            newObj.date = `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`;
        
                            console.log(newObj);
                            if(newObj.numberOfTrade){
                                detailPnl.push(JSON.parse(JSON.stringify(newObj)));
                            }
                            
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                        
                            console.log(detailPnl);
                            
                            (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                        }

                        (firstDateSplit[2]) = 1;
                        (firstDateSplit[1]) = Number(firstDateSplit[1]) + 1;
                        while(Number(firstDateSplit[2]) <= (secondDateSplit[2])){
                            // let firstDateDigit = Number(firstDateSplit[2]);
                            // let secondDateDigit = Number(secondDateSplit[2]);
                            let singleDateData = filteredData.filter((elem)=>{
                                let splitting = (elem.order_timestamp).split(" ");
                                return splitting[0] === (`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`)
                            })
                            console.log(filteredData);
                            console.log(singleDateData, `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`);
                            let newObj = pnlCalculation(singleDateData);
                            newObj.date = `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`;
        
                            console.log(newObj);
                            if(newObj.numberOfTrade){
                                detailPnl.push(JSON.parse(JSON.stringify(newObj)));
                            }
                            
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                        
                            console.log(detailPnl);
                            
                            (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                        }
                    }
                }).catch((err)=>{
                    return new Error(err);
                })
    
            } else{
                let data = userDetail.filter((elem)=>{
                    return elem.name === selectUserState
                })

                axios.get(`${baseUrl}api/v1/readmocktradeuseremail/${data[0].email}`)
                .then((res) => {
                    let filteredData = (res.data).filter((elem)=>{
                        let timeStamp = elem.order_timestamp;
                        let oneDateSplit = (timeStamp).split(" ");
                        let twoDateSplit = oneDateSplit[0].split("-");
                        timeStamp = `${twoDateSplit[2]}-${twoDateSplit[1]}-${twoDateSplit[0]}`

                        return timeStamp >= firstDate && timeStamp <= secondDate;
                    })
                    console.log(filteredData);
                    if(Number(firstDateSplit[2]) <= Number(secondDateSplit[2])){
                        while(Number(firstDateSplit[2]) <= Number(secondDateSplit[2])){
                            // let firstDateDigit = Number(firstDateSplit[2]);
                            // let secondDateDigit = Number(secondDateSplit[2]);
                            let singleDateData = filteredData.filter((elem)=>{
                                let splitting = (elem.order_timestamp).split(" ");
                                return splitting[0] === (`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`)
                            })
                            
                            console.log(singleDateData, `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`);
                            let newObj = pnlCalculation(singleDateData);
                            newObj.date = `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`;
        
                            console.log(newObj);
                            if(newObj.numberOfTrade){
                                detailPnl.push(JSON.parse(JSON.stringify(newObj)));
                            }
                            
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                        
                            console.log(detailPnl);
                            
                            (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                        }
                    } else{
                        while(Number(firstDateSplit[2]) <= 31){
                            // let firstDateDigit = Number(firstDateSplit[2]);
                            // let secondDateDigit = Number(secondDateSplit[2]);
                            let singleDateData = filteredData.filter((elem)=>{
                                let splitting = (elem.order_timestamp).split(" ");
                                return splitting[0] === (`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`)
                            })
                            console.log(filteredData);
                            console.log(singleDateData, `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`);
                            let newObj = pnlCalculation(singleDateData);
                            newObj.date = `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`;
        
                            console.log(newObj);
                            if(newObj.numberOfTrade){
                                detailPnl.push(JSON.parse(JSON.stringify(newObj)));
                            }
                            
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                        
                            console.log(detailPnl);
                            
                            (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                        }

                        (firstDateSplit[2]) = 1;
                        (firstDateSplit[1]) = Number(firstDateSplit[1]) + 1;
                        while(Number(firstDateSplit[2]) <= (secondDateSplit[2])){
                            // let firstDateDigit = Number(firstDateSplit[2]);
                            // let secondDateDigit = Number(secondDateSplit[2]);
                            let singleDateData = filteredData.filter((elem)=>{
                                let splitting = (elem.order_timestamp).split(" ");
                                return splitting[0] === (`${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`)
                            })
                            console.log(filteredData);
                            console.log(singleDateData, `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`);
                            let newObj = pnlCalculation(singleDateData);
                            newObj.date = `${firstDateSplit[2]}-${firstDateSplit[1]}-${firstDateSplit[0]}`;
        
                            console.log(newObj);
                            if(newObj.numberOfTrade){
                                detailPnl.push(JSON.parse(JSON.stringify(newObj)));
                            }
                            
                            transactionCost = 0;
                            totalPnl = 0;
                            numberOfTrade = 0;
                            lotUsed = 0;
                        
                            console.log(detailPnl);
                            
                            (firstDateSplit[2]) = Number(firstDateSplit[2]) + 1;
                        }
                    }
                }).catch((err)=>{
                    return new Error(err);
                })
                
            }
        }

        console.log(detailPnl);
    }

    function pnlCalculation(data){
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
            getDetails.tradeData.map((element)=>{
                if(element.symbol === elem.symbol){
                    getDetails.marketData.map((subElem)=>{
                        if(subElem !== undefined && subElem.instrument_token === element.instrumentToken){
                            liveDetailsArr.push(subElem)
                        }
                    })
                }
            })
        })

        
        overallPnl.map((elem, index)=>{
            name = elem.name;
            console.log(elem.totalBuy,elem.totalSell,elem.totalBuyLot,elem.totalSellLot, liveDetailsArr[index]?.last_price)
            totalPnl += (-(elem.totalBuy+elem.totalSell-(elem.totalBuyLot+elem.totalSellLot)*liveDetailsArr[index]?.last_price))
            lotUsed += Math.abs(elem.totalBuyLot) + Math.abs(elem.totalSellLot);
        })

        let newObj = {
            brokerage: transactionCost,
            pnl: totalPnl,
            name: name,
            numberOfTrade: numberOfTrade,
            lotUsed: lotUsed
        }

        return newObj;
    }

    function selectUser(e){
        e.preventDefault();
        setSelectUserState(e.target.value);
        // secondDateChange(e)
    }

    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <div className={Styles.main_dateSelData}>
                            <div className={Styles.form_div}>
                                <form action="">
                                    <label htmlFor="" className={Styles.formLable}>Start Date</label>
                                    <input type="date" className={Styles.formInput} onChange={(e)=>{firstDateChange(e)}}/>
                                    <label htmlFor="" className={Styles.formLable}>End Date</label>
                                    <input type="date" className={Styles.formInput} onChange={(e)=>{secondDateChange(e)}}/>
                                    <label htmlFor="" className={Styles.formLable}>Trader</label>
                                    { getDetails.userDetails.role === "user" ?
                                        <select name="" id="" className={Styles.formSelect} onChange={(e)=>{selectUser(e)}} >
                                            <option value="">{getDetails.userDetails.name}</option>
                                        </select>
                                    :
                                    getDetails.userDetails.role === "admin" &&
                                    <select name="" id="" className={Styles.formSelect} onChange={(e)=>{selectUser(e)}} >
                                        <option value="">Select User</option>
                                        {userDetail.map((elem)=>{
                                            return(
                                                <option value={elem.name}>{elem.name}</option>
                                            )
                                        })}
                                        <option value="">All User</option>
                                    </select> }
                                </form>
                            </div>
                            <div className={Styles.btn_div}>
                                <span className={`${Styles.formLable}`}>Gross P&L</span> <input type="text" className={`${Styles.formInput} ${Styles.formInput1}`} />
                                <span className={Styles.formLable}>Transaction Cost</span> <input type="text" className={Styles.formInput} />
                                <span className={Styles.formLable}>Net P&L</span> <input type="text" className={Styles.formInput} />
                                <button className={Styles.formButton}> Download Report</button>

                            </div>
                        </div>
                        <div className={Styles.grid_1}>
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Trader Name</th>
                                    <th className="grid2_th">Date</th>
                                    <th className="grid2_th">Gross P&L(₹)</th>
                                    <th className="grid2_th">Transaction Cost(₹)</th>
                                    <th className="grid2_th">Net PNL(₹)</th>
                                    <th className="grid2_th"># of Trades</th>
                                    <th className="grid2_th"># of Lots Used</th>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}