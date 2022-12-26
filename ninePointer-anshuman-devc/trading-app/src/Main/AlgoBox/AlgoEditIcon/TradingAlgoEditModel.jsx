import React, { useState } from "react";
import { useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import Styles from "./TradingAlgoEditModel.module.css";
import axios from "axios";


export default function TradingAlgoEditModel ({ data, id, Render }) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

    let date = new Date();
    let lastModified = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

    const { reRender, setReRender } = Render;
    const [editData, setEditData] = useState(data);

    const [algoName, setAlgoName] = useState();
    const [transactionChange, setTransactionChange] = useState();
    const [instrumentChange, setInstrumentChange] = useState();
    const [exchangeChange, setExchangeChange] = useState();
    const [productChange, setProductChange] = useState();
    const [lotMultipler, setLotMultipler] = useState();
    const [tradingAccount, setTradingAccount] = useState();
    const [status, setStatus] = useState();
    const [mappedUser, setMappedUser] = useState([]);
   
    useEffect(() => {
        let updatedData = data.filter((elem) => {
            return elem._id === id
        })
        setEditData(updatedData)

        axios.get(`${baseUrl}api/v1/readpermission`)
        .then((res)=>{
            let mappedUserUpdate = (res.data).filter((elem)=>{
                console.log(elem.algoName, updatedData[0].algoName);
                return elem.algoName === updatedData[0].algoName
            })
            setMappedUser(mappedUserUpdate);
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })
    }, [])

    useEffect(() => {
        console.log("edit data", editData);

        setAlgoName(editData[0].algoName)
        setTransactionChange(editData[0].transactionChange);
        setInstrumentChange(editData[0].instrumentChange);
        setExchangeChange(editData[0].exchangeChange);
        setProductChange(editData[0].productChange);
        setLotMultipler(editData[0].lotMultipler);
        setTradingAccount(editData[0].tradingAccount);
        setStatus(editData[0].status);

    }, [editData, reRender])
    console.log(editData, id);
    console.log("mappedUser", mappedUser);

    const [formstate, setformstate] = useState({
        algo_Name: "",
        transaction_Change : "",
        instrument_Change : "",
        Status : "",
        exchange_Change:"",
        lot_Multipler:"",
        product_Change : "",
        trading_Account:""
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

        formstate.algo_Name = algoName;
        formstate.transaction_Change = transactionChange;
        formstate.instrument_Change = instrumentChange;
        formstate.exchange_Change = exchangeChange;
        formstate.lot_Multipler = lotMultipler;
        formstate.product_Change = productChange;
        formstate.trading_Account = tradingAccount;
        formstate.Status = status;

        setformstate(formstate);

        const {algo_Name, transaction_Change, instrument_Change, Status, exchange_Change, lot_Multipler, product_Change, trading_Account } = formstate;

        const res = await fetch(`${baseUrl}api/v1/readtradingAlgo/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                algo_Name, transaction_Change, instrument_Change, Status, exchange_Change, lot_Multipler, product_Change, trading_Account, lastModified
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

        mappedUser.map((elem)=>{
            patchReqMappedUser(elem._id, algo_Name);
        })

        setModal(!modal);
        reRender ? setReRender(false) : setReRender(true)
    }

    async function Ondelete() {
        console.log(editData)
        const res = await fetch(`${baseUrl}api/v1/readtradingAlgo/${id}`, {
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

        mappedUser.map((elem)=>{
            deleteReqMappedUser(elem._id);
        })

        setModal(!modal);
        reRender ? setReRender(false) : setReRender(true)
    }

    async function patchReqMappedUser(id, algo_Name){
        
        const response = await fetch(`${baseUrl}api/v1/readpermissionalgo/${id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                algo_Name
            })
        });

        const permissionData = await response.json();

        if (permissionData.status === 422 || permissionData.error || !permissionData) {
            window.alert(permissionData.error);
            console.log("Failed to Edit");
        }else {
            console.log(permissionData);
            // window.alert("Edit succesfull");
            console.log("Edit succesfull");
        }
    }
    async function deleteReqMappedUser(id){

        const response = await fetch(`${baseUrl}api/v1/readpermission/${id}`, {
            method: "DELETE",
        });
        const permissionData = await response.json();

        if(permissionData.status === 422 || permissionData.error || !permissionData){
            window.alert(permissionData.error);
            console.log("Failed to Delete");
        }else {
            console.log(permissionData);
            // window.alert("Delete succesfull");
            console.log("Delete succesfull");
        }
    }
    return (
        <>
            <button onClick={toggleModal} className={Styles.tiicon}><TiEdit /></button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className={Styles.modalContent}>
                        <form className={Styles.main_instrument_form}>
                            <label className={Styles.Ac_form} htmlFor="">Algo Name</label>
                            <input type="text" value={algoName} className={Styles.Ac_forminput} onChange={(e)=>{{ setAlgoName (e.target.value) }}} />
                            <label htmlFor="" className={Styles.Ac_form}>Transaction Change</label>
                            <select name="" id="" value={transactionChange} className={Styles.Ac_forminput} onChange={(e)=>{{ setTransactionChange(e.target.value)}}}>
                                <option value=""></option>
                                <option value="TRUE">TRUE</option>
                                <option value="FALSE">FALSE</option>
                            </select>
                            <label htmlFor="" className={Styles.Ac_form}>Instrument Change</label>
                            <select name="" id="" value={instrumentChange} className={Styles.Ac_forminput} onChange={(e)=>{{ setInstrumentChange(e.target.value)}}}>
                                <option value=""></option>
                                <option value="TRUE">TRUE</option>
                                <option value="FALSE">FALSE</option>
                            </select>
                            <label htmlFor="" className={Styles.Ac_form}>Exchange Change</label>
                            <select name="" id="" value={exchangeChange} className={Styles.Ac_forminput} onChange={(e)=>{{setExchangeChange(e.target.value)}}}>
                                <option value=""></option>
                                <option value="TRUE">TRUE</option>
                                <option value="FALSE">FALSE</option>
                            </select>
                            <label htmlFor="" className={Styles.Ac_form}>Product Change</label>
                            <select name="" id="" value={productChange} className={Styles.Ac_forminput} onChange={(e)=>{{setProductChange(e.target.value)}}}>
                                <option value=""></option>
                                <option value="TRUE">TRUE</option>
                                <option value="FALSE">FALSE</option>
                            </select>
                            <label htmlFor="" className={Styles.Ac_form}>Lot Multipler</label>
                            <input type="text" value={lotMultipler} className={Styles.Ac_forminput} onChange={(e)=>{{setLotMultipler(e.target.value)}}} />
                            <label htmlFor="" className={Styles.Ac_form}>Trading Account</label>
                            <input type="text" value={tradingAccount} className={Styles.Ac_forminput} onChange={(e)=>{{setTradingAccount(e.target.value)}}} />
                            <label htmlFor="" className={Styles.Ac_form}>Status</label>
                            <select name="" id="" value={status} className={Styles.Ac_forminput} onChange={(e)=>{{setStatus(e.target.value)}}}>
                                <option value=""></option>
                                <option value="Active">Active</option>
                                <option value="InActive">InActive</option>
                            </select>
                        </form>
                        <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button> <button className={Styles.ACform_tbn} onClick={Ondelete}>Delete</button>

                    </div>
                </div>
            )}
        
        </>
    )
}