import React, { useState } from "react";
import { useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import Styles from "./InstrumentMappingEditModel.module.css";


export default function InstrumentMappingEditModel ({ data, id, Render }) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

    let date = new Date();
    let lastModified = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

    const { reRender, setReRender } = Render;
    const [editData, setEditData] = useState(data);

    const [instNameIncoming, setInstNameIncoming] = useState();
    const [incInstrumentCode, setIncInstrumentCode] = useState();
    const [instNameOutgoing, setInstNameOutgoing] = useState();
    const [outInstrumentCode, setoutInstrumentCode] = useState();
    const [status, setStatus] = useState();
   
    useEffect(() => {
        let updatedData = data.filter((elem) => {
            return elem._id === id
        })
        setEditData(updatedData)
    }, [])

    useEffect(() => {
        console.log("edit data", editData);

        setInstNameIncoming(editData[0].InstrumentNameIncoming)
        setIncInstrumentCode(editData[0].IncomingInstrumentCode);
        setInstNameOutgoing(editData[0].InstrumentNameOutgoing);
        setoutInstrumentCode(editData[0].OutgoingInstrumentCode);
        setStatus(editData[0].Status);

    }, [editData, reRender])
    console.log(editData, id);
    console.log(editData[0].instNameIncoming, instNameIncoming);
    const [formstate, setformstate] = useState({
        InstrumentNameIncoming: "",
        IncomingInstrumentCode: "",
        InstrumentNameOutgoing: "",
        OutgoingInstrumentCode: "",
        Status: "",
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

        formstate.InstrumentNameIncoming = instNameIncoming;
        formstate.IncomingInstrumentCode = incInstrumentCode;
        formstate.InstrumentNameOutgoing = instNameOutgoing;
        formstate.OutgoingInstrumentCode = outInstrumentCode;
        formstate.Status = status;

        setformstate(formstate);


        const { InstrumentNameIncoming, IncomingInstrumentCode, InstrumentNameOutgoing, OutgoingInstrumentCode, Status} = formstate;

        const res = await fetch(`${baseUrl}api/v1/readInstrumentAlgo/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                InstrumentNameIncoming, IncomingInstrumentCode, InstrumentNameOutgoing, OutgoingInstrumentCode, Status, lastModified
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
        const res = await fetch(`${baseUrl}api/v1/readInstrumentAlgo/${id}`, {
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
                            <label className={Styles.Ac_form} htmlFor="">Instrument Name (Incoming)</label>
                            <input type="text" value={instNameIncoming} className={Styles.Ac_forminput} onChange={(e) => { { setInstNameIncoming(e.target.value)} }} />
                            <label htmlFor="" className={Styles.Ac_form}>Incoming Instrument Code</label>
                            <input type="text" value={incInstrumentCode} className={Styles.Ac_forminput} onChange={(e) => { { setIncInstrumentCode(e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>Instrument Name (Outgoing)</label>
                            <input type="text" value={instNameOutgoing} className={Styles.Ac_forminput} onChange={(e) => { { setInstNameOutgoing(e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>Outgoing Instrument Code</label>
                            <input type="text" value={outInstrumentCode} className={Styles.Ac_forminput} onChange={(e) => { { setoutInstrumentCode(e.target.value)} }} />
                            <label htmlFor="" className={Styles.Ac_form}>Status</label>
                            <select name="" id="" value={status} className={Styles.Ac_forminput} onChange={(e) => { { setStatus(e.target.value)} }}>
                                <option value=""></option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </form>
                        <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button> <button className={Styles.ACform_tbn} onClick={Ondelete}>Delete</button>

                    </div>
                </div>
            )}
        </>
    )
}