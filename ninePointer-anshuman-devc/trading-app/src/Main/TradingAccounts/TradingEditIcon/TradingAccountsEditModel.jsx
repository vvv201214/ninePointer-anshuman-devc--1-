import React, { useState } from "react";
import { useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import Styles from "./TradingAccountsEditModel.module.css";


export default function TradingAccountsEditModel ({ data, id, Render }) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

    let date = new Date();
    let lastModified = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

    const { reRender, setReRender } = Render;
    const [editData, setEditData] = useState(data);

    const [broker, setbroker] = useState();
    const [accountId, setAccountId] = useState();
    const [accountName, setAccountName] = useState();
    const [apiKey, setApiKey] = useState();
    const [apiSecret, setApiSecret] = useState();
    const [status, setStatus] = useState();
   
    useEffect(() => {
        let updatedData = data.filter((elem) => {
            return elem._id === id
        })
        setEditData(updatedData)
    }, [])

    useEffect(() => {
        console.log("edit data", editData);

        setbroker(editData[0].brokerName)
        setAccountId(editData[0].accountId);
        setAccountName(editData[0].accountName);
        setApiKey(editData[0].apiKey);
        setApiSecret(editData[0].apiSecret);
        setStatus(editData[0].status);

    }, [editData, reRender])
    console.log(editData, id);
    console.log(editData[0].broker, broker);
    const [formstate, setformstate] = useState({
        Broker: "",
        AccountID : "",
        AccountName : "",
        APIKey : "",
        APISecret : "",
        Status:""
    });

    console.log(formstate);
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    async function formbtn(e) {
        e.preventDefault();
        setModal(!modal);
        formstate.Broker = broker;
        formstate.AccountID = accountId;
        formstate.AccountName = accountName;
        formstate.APIKey = apiKey;
        formstate.APISecret = apiSecret;
        formstate.Status = status;

        setformstate(formstate);
        

        const { Broker, AccountID, AccountName, APIKey, APISecret, Status} = formstate;

        const res = await fetch(`${baseUrl}api/v1/readAccountDetails/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                Broker, AccountID, AccountName, APIKey, APISecret, Status, lastModified
            })
        });
        const dataResp = await res.json();
        console.log(dataResp);
        if (dataResp.status === 422 || dataResp.error || !dataResp) {
            window.alert(dataResp.error);
            console.log("Failed to Edit");
        } else {
            console.log(dataResp);
            window.alert("Edit succesfull");
            console.log("Edit succesfull");
        }
        setModal(!modal);
        reRender ? setReRender(false) : setReRender(true)
    }

    async function Ondelete() {
        console.log(editData)
        setModal(!modal);
        const res = await fetch(`${baseUrl}api/v1/readAccountDetails/${id}`, {
            method: "DELETE",
        });

        const dataResp = await res.json();
        console.log(dataResp);
        if (dataResp.status === 422 || dataResp.error || !dataResp) {
            window.alert(dataResp.error);
            console.log("Failed to Delete");
        } else {
            console.log(dataResp);
            window.alert("Delete succesfull");
            console.log("Delete succesfull");
        }

        setModal(!modal);
        reRender ? setReRender(false) : setReRender(true)
    }
    return (
        <>
            <button onClick={toggleModal}><TiEdit /></button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className={Styles.modalContent}>
                        <form className={Styles.main_instrument_form}>
                            <label className={Styles.Ac_form} htmlFor="">Broker</label>
                            <input type="text" value={broker} className={Styles.Ac_forminput} onChange={(e)=>{{setbroker(e.target.value)}}} />
                            <label className={Styles.Ac_form} htmlFor="">Account ID</label>
                            <input type="text" value={accountId} className={Styles.Ac_forminput} onChange={(e)=>{{setAccountId(e.target.value)}}}/>
                            <label className={Styles.Ac_form} htmlFor="">Acccount Name</label>
                            <input type="text" value={accountName} className={Styles.Ac_forminput}  onChange={(e)=>{{setAccountName(e.target.value)}}} />
                            <label className={Styles.Ac_form} htmlFor="">API Key</label>
                            <input type="text" value={apiKey} className={Styles.Ac_forminput}  onChange={(e)=>{{setApiKey(e.target.value)}}} />
                            <label className={Styles.Ac_form}htmlFor="">API Secret</label>
                            <input type="text" value={apiSecret} className={Styles.Ac_forminput}  onChange={(e)=>{{setApiSecret(e.target.value)}}} />
                            <label htmlFor="" className={Styles.Ac_form}>Status</label>
                            <select name="" id="" value={status} className={Styles.Ac_forminput} onChange={(e)=>{{setStatus(e.target.value)}}}>
                                <option value=""></option>
                                <option value="Inactive">Inactive</option>
                                <option value="Active">Active</option>
                            </select>                         
                        </form>
                        <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button> <button className={Styles.ACform_tbn} onClick={Ondelete}>Delete</button>

                    </div>
                </div>
            )}
        </>
    )
}