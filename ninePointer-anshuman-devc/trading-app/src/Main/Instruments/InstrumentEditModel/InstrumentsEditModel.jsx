import React, { useState } from "react";
import { useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import Styles from "./InstrumentsEditModel.module.css";


export default function InstrumentsEditModel({ data, id, Render }) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

    let date = new Date();
    let lastModified = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

    const { reRender, setReRender } = Render;
    const [editData, setEditData] = useState(data);

    const [contractDate, setcontractDate] =useState();
    const [instrument, setInstrument] = useState();
    const [exchange, setexchange] = useState();
    const [symbol, setsymbol] = useState();
    const [lotSize, setlotSize] = useState();
    const [maxlot, setMaxlot] = useState();
    const [status, setStatus] = useState();

    useEffect(() => {
        let updatedData = data.filter((elem) => {
            return elem._id === id
        })
        setEditData(updatedData)
    }, [])

    useEffect(() => {
        console.log("edit data", editData);

        setcontractDate(editData[0].contractDate);
        setInstrument(editData[0].instrument)
        setexchange(editData[0].exchange);
        setsymbol(editData[0].symbol);
        setlotSize(editData[0].lotSize);
        setMaxlot(editData[0].maxLot);
        setStatus(editData[0].status);

    }, [editData, reRender])
    console.log(editData, id);
    console.log(editData[0].instrument, instrument);
    const [formstate, setformstate] = useState({
        contract_Date:"",
        Instrument: "",
        Exchange: "",
        Status: "",
        Symbole: "",
        LotSize: "",
        maxLot:"",
        LastModifiedOn: ""
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
        formstate.contract_Date = contractDate;
        formstate.Instrument = instrument;
        formstate.Exchange = exchange;
        formstate.Symbole = symbol;
        formstate.LotSize = lotSize;
        formstate.maxLot = maxlot;
        formstate.Status = status;
        setModal(!modal);
        setformstate(formstate);


        const { contract_Date,Instrument, Exchange, Symbole,LotSize,maxLot, Status } = formstate;

        const res = await fetch(`${baseUrl}api/v1/readInstrumentDetails/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                contract_Date ,Instrument, Exchange, Symbole,LotSize, maxLot, Status, lastModified
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
        const res = await fetch(`${baseUrl}api/v1/readInstrumentDetails/${id}`, {
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
                            <label className={Styles.Ac_form} htmlFor="">Contract Date</label>
                            <input type="date" value={contractDate} className={Styles.Ac_forminput} onChange={(e) => { { setcontractDate (e.target.value) } }} />
                            <label className={Styles.Ac_form} htmlFor="">Instrument</label>
                            <input type="text" value={instrument} className={Styles.Ac_forminput} onChange={(e) => { { setInstrument(e.target.value) } }} />
                            <label className={Styles.Ac_form} htmlFor="">Exchange</label>
                            <input type="text" value={exchange} className={Styles.Ac_forminput} onChange={(e) => { { setexchange(e.target.value).toUpperCase() } }} />
                            <label className={Styles.Ac_form} htmlFor="">Symbol</label>
                            <input type="text" value={symbol} className={Styles.Ac_forminput} onChange={(e) => { { setsymbol(e.target.value).toUpperCase() } }} />
                            <label htmlFor="" className={Styles.Ac_form}>Lot Size</label>
                            <input type="text" value={lotSize} className={Styles.Ac_forminput} onChange={(e) => { { setlotSize(e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>Max Lot</label>
                            <input type="number" value={maxlot} className={Styles.Ac_forminput} onChange={(e) => { { setMaxlot (e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>Status</label>
                            <select name="" id="" value={status} className={Styles.Ac_forminput} onChange={(e) => { { setStatus(e.target.value) } }}>
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