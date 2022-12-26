import React, { useState } from "react";
import { useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import Styles from "./BrokerageEditModel.module.css";


export default function BrokerageEditModel ({ data, id, Render }) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

    let date = new Date();
    let lastModified = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

    const { reRender, setReRender } = Render;
    const [editData, setEditData] = useState(data);

    const [brokerr, setBrokerr] = useState();
    const [transaction, setTransaction] = useState();
    const [type, settype] = useState();
    const [exchange, setExchange] = useState();
    const [brokerageCharge, setBrokerageCharge] = useState();
    const [exchangeCharge, setExchangeCharge] = useState();
    const [gst, setGst] = useState();
    const [sebiCharge, setSebiCharge] = useState();
    const [stampDuty, setStampDuty] = useState();
    const [sst, setSst] = useState();
    const [ctt, setCtt] = useState();
    const [dpCharge, setDpCharge] = useState();
   
    useEffect(() => {
        let updatedData = data.filter((elem) => {
            return elem._id === id
        })
        setEditData(updatedData)
    }, [])

    useEffect(() => {
        console.log("edit data", editData);

        setBrokerr(editData[0].brokerName)
        setTransaction(editData[0].transaction);
        settype(editData[0].type);
        setExchange(editData[0].exchange);
        setBrokerageCharge(editData[0].brokerageCharge);
        setExchangeCharge(editData[0].exchangeCharge);
        setGst(editData[0].gst);
        setSebiCharge(editData[0].sebiCharge);
        setStampDuty(editData[0].stampDuty);
        setSst(editData[0].sst);
        setCtt(editData[0].ctt);
        setDpCharge(editData[0].dpCharge);

    }, [editData, reRender])
    console.log(editData, id);
    console.log(editData[0].brokerr, brokerr);
    const [formstate, setformstate] = useState({
        Broker: "",
        Transaction: "",
        Type: "",
        Exchange: "",
        BrokerageCharge: "",
        ExchangeCharge: "",
        GST: "",
        SEBICharge: "",
        StampDuty: "",
        SST: "",
        CTT: "",
        DPCharges: ""
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

        formstate.Broker = brokerr;
        formstate.Transaction = transaction;
        formstate.Type = type;
        formstate.Exchange = exchange;
        formstate.BrokerageCharge = brokerageCharge;
        formstate.ExchangeCharge = exchangeCharge;
        formstate.GST = gst;
        formstate.SEBICharge = sebiCharge;
        formstate.StampDuty = stampDuty;
        formstate.SST = sst;
        formstate.CTT = ctt;
        formstate.DPCharges = dpCharge;

        setformstate(formstate);


        const { Broker, Transaction, Type, Exchange, BrokerageCharge, ExchangeCharge, GST, SEBICharge,StampDuty,SST,CTT,DPCharges} = formstate;

        const res = await fetch(`${baseUrl}api/v1/readBrokerage/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                Broker, Transaction, Type, Exchange, BrokerageCharge, ExchangeCharge, GST, SEBICharge,StampDuty,SST,CTT, DPCharges, lastModified
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
        const res = await fetch(`${baseUrl}api/v1/readBrokerage/${id}`, {
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
                            <input type="text" value={brokerr} className={Styles.Ac_forminput} onChange={(e) => { { setBrokerr(e.target.value) } }} />
                            <label className={Styles.Ac_form} htmlFor="">Transaction</label>
                            <select name="" id="" value={transaction} className={Styles.Ac_forminput} onChange={(e) => { { setTransaction(e.target.value) } }}>
                                <option value=""></option>
                                <option value="BUY">BUY</option>
                                <option value="SELL">SELL</option>
                            </select>
                            <label className={Styles.Ac_form} htmlFor="">Type</label>
                            <select name="" id="" value={type} className={Styles.Ac_forminput} onChange={(e) => { { settype(e.target.value) } }}>
                                <option value=""></option>
                                <option value="Stocks">Stocks</option>
                                <option value="Option">Option</option>
                                <option value="Futures">Futures</option>
                                <option value="Currency">Currency</option>
                                <option value="Commodities">Commodities</option>
                            </select>
                            <label className={Styles.Ac_form} htmlFor="">Exchange</label>
                            <select name="" id="" value={exchange} className={Styles.Ac_forminput} onChange={(e) => { { setExchange(e.target.value) } }}>
                                <option value=""></option>
                                <option value="NSE">NSE</option>
                                <option value="BSE">BSE</option>
                            </select>
                            <label className={Styles.Ac_form} htmlFor="">Brokerage Change</label>
                            <input type="text" value={brokerageCharge} className={Styles.Ac_forminput} onChange={(e) => { { setBrokerageCharge(e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>Exchange Charge</label>
                            <input type="text" name="" id="" value={exchangeCharge} className={Styles.Ac_forminput} onChange={(e) => { { setExchangeCharge(e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>GST</label>
                            <input type="text" value={gst} className={Styles.Ac_forminput} onChange={(e) => { { setGst(e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>SEBI Charges</label>
                            <input type="text" value={sebiCharge} className={Styles.Ac_forminput} onChange={(e) => { { setSebiCharge(e.target.value) } }} />
                            <label htmlFor=""  className={Styles.Ac_form}>Stamp Duty Charges</label>
                            <input type="text" value={stampDuty} className={Styles.Ac_forminput} onChange={(e) => { { setStampDuty(e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>SST</label>
                            <input type="text" value={sst} className={Styles.Ac_forminput} onChange={(e) => { { setSst(e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>CTT</label>
                            <input type="text" value={ctt} className={Styles.Ac_forminput} onChange={(e) => { { setCtt(e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>DP Charges</label>
                            <input type="text" value={dpCharge} className={Styles.Ac_forminput} onChange={(e) => { { setDpCharge(e.target.value) } }} />
                        </form>
                        <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button> <button className={Styles.ACform_tbn} onClick={Ondelete}>Delete</button>

                    </div>
                </div>
            )}
        </>
    )
}