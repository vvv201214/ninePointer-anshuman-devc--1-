import React, { useEffect } from "react";
import "./TradingAccounts.css";
import "./Accounts.css";
import { useState } from "react";
import uniqid from "uniqid";
import axios from "axios";
import Styles from "./TradingAccountsCSSFiles/TradingAccounts.module.css";
import TradingAccountsEditModel from "./TradingEditIcon/TradingAccountsEditModel";

function TradingAccounts() {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

    let uId = uniqid();
    let date = new Date();
    let createdOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    let lastModified = createdOn;
    let createdBy = "prateek"

    const[open, setOpen] = useState(false);
    const [activeData, setActiveData] = useState([]);
    const [inactiveData, setInactiveData] = useState([]);
    const [reRender, setReRender] = useState(true);
    const[formstate, setformstate] = useState({
        Broker: "",
        AccountID : "",
        AccountName : "",
        APIKey : "",
        APISecret : "",
        Status:""
    });
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    async function formbtn(e){
        e.preventDefault();
        setformstate(formstate);
        console.log(formstate)
        setModal(!modal);
        const {AccountID, Broker, AccountName, APIKey, APISecret, Status} = formstate;

        const res = await fetch(`${baseUrl}api/v1/account`, {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                accountId:AccountID, accountName:AccountName, apiKey:APIKey, apiSecret:APISecret, status:Status, brokerName:Broker, uId, createdBy, createdOn, lastModified
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
        }
        reRender ? setReRender(false) : setReRender(true)

        setOpen(false);
    }
    useEffect(()=>{
        axios.get(`${baseUrl}api/v1/readAccountDetails`)
        .then(async (res)=>{
            let data = res.data;
            let active = data.filter((elem)=>{
                console.log(elem.createdOn, createdOn);
                return elem.status === "Active"
            })
            setActiveData(active);
            console.log(active);

            let inActive = data.filter((elem) => {
                return elem.status === "Inactive"
            })
            setInactiveData(inActive);
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })
    },[reRender])


    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                    <button onClick={toggleModal} className="Ac_btn">Add Company Trading Account</button>
                        {modal && (
                            <div className="modal">
                                <div onClick={toggleModal} className="overlay"></div>
                                <div className={Styles.modalContent}>
                                    <div className={Styles.form_btn}>
                                    <form className={Styles.main_instrument_form}>
                                        <label className={Styles.Ac_form} htmlFor="">Broker</label>
                                        <input type="text" className={Styles.Ac_forminput} onChange={(e)=>{{formstate.Broker = e.target.value}}} />
                                        <label className={Styles.Ac_form} htmlFor="">Account ID</label>
                                        <input type="text" className={Styles.Ac_forminput} onChange={(e)=>{{formstate.AccountID = e.target.value}}}/>
                                        <label className={Styles.Ac_form} htmlFor="">Acccount Name</label>
                                        <input type="text" className={Styles.Ac_forminput}  onChange={(e)=>{{formstate.AccountName = e.target.value}}} />
                                        <label className={Styles.Ac_form} htmlFor="">API Key</label>
                                        <input type="text" className={Styles.Ac_forminput}  onChange={(e)=>{{formstate.APIKey = e.target.value}}} />
                                        <label className={Styles.Ac_form}htmlFor="">API Secret</label>
                                        <input type="text" className={Styles.Ac_forminput}  onChange={(e)=>{{formstate.APISecret = e.target.value}}} />
                                        <label htmlFor="" className={Styles.Ac_form}>Status</label>
                                        <select name="" id="" className={Styles.Ac_forminput} onChange={(e)=>{{formstate.Status = e.target.value}}}>
                                            <option value=""></option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="Active">Active</option>
                                        </select>                            
                                        <br />
                                        <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button>
                                    </form>
                                    </div>
                                </div>
                            </div>
                        )}
                        <span className="grid1_span">Active Company Trading Accounts</span>
                        <div className="grid_1">
                            <table className="grid1_table">
                            <tr className="grid2_tr">
                                <th className="grid2_th">Broker</th>
                                <th className="grid2_th">Account ID</th>
                                <th className="grid2_th">Account Name</th>
                                <th className="grid2_th">API Key</th>
                                <th className="grid2_th">API Secret</th>
                                <th className="grid2_th">Status</th>
                            </tr>
                            {activeData.map((elem)=>{
                                return(
                                <tr className="grid2_tr" key={elem.uId} >
                                    <td className="grid2_td"><span className="Editbutton"><TradingAccountsEditModel data={activeData} id={elem._id} Render={{setReRender, reRender}}/></span>{elem.brokerName}</td>
                                    <td className="grid2_td">{elem.accountId}</td>
                                    <td className="grid2_td">{elem.accountName}</td>
                                    <td className="grid2_td">{elem.apiKey}</td>
                                    <td className="grid2_td">{elem.apiSecret}</td>
                                    <td className="grid2_td">{elem.status}</td>
                                   
                                </tr>
                                )
                                })
                            }
                            </table>
                        </div>
                        <span className="grid2_span">Inactive Company Trading Accounts</span>
                        <div className="grid_2">
                            <table className="grid1_table">
                            <tr className="grid2_tr">
                                <th className="grid2_th">Broker</th>
                                <th className="grid2_th">Account ID</th>
                                <th className="grid2_th">Account Name</th>
                                <th className="grid2_th">API Key</th>
                                <th className="grid2_th">API Secret</th>
                                <th className="grid2_th">Status</th>
                            </tr>
                            {inactiveData.map((elem) =>{
                                return(
                                <tr className="grid2_tr" key={elem.uId} >
                                    <td className="grid2_td"><span className="Editbutton"><TradingAccountsEditModel data={inactiveData} id={elem._id} Render={{setReRender, reRender}}/></span>{elem.brokerName}</td>
                                    <td className="grid2_td">{elem.accountId}</td>
                                    <td className="grid2_td">{elem.accountName}</td>
                                    <td className="grid2_td">{elem.apiKey}</td>
                                    <td className="grid2_td">{elem.apiSecret}</td>
                                    <td className="grid2_td">{elem.status}</td>
                                </tr>
                                )
                                })
                            }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TradingAccounts;

