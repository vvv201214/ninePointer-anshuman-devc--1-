import React, { useState } from "react";
import { useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import Styles from "./ProductMappingEditModel.module.css";


export default function ProductMappingEditModel ({ data, id, Render }) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

    let date = new Date();
    let lastModified = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

    const { reRender, setReRender } = Render;
    const [editData, setEditData] = useState(data);

    const [proNameIncoming, setProNameIncoming] = useState();
    const [inProductCode, setInProductCode] = useState();
    const [proNameOutgoing, setProNameOutgoing] = useState();
    const [outProductCode, setoutProductCode] = useState();
    const [status, setStatus] = useState();
   
    useEffect(() => {
        let updatedData = data.filter((elem) => {
            return elem._id === id
        })
        setEditData(updatedData)
    }, [])

    useEffect(() => {
        console.log("edit data", editData);

        setProNameIncoming(editData[0].ProductNameIncoming)
        setInProductCode(editData[0].IncomingProductCode);
        setProNameOutgoing(editData[0].ProductNameOutgoing);
        setoutProductCode(editData[0].OutgoingProductCode);
        setStatus(editData[0].Status);

    }, [editData, reRender])
    console.log(editData, id);
    console.log(editData[0].proNameIncoming, proNameIncoming);
    const [formstate, setformstate] = useState({
        ProductNameIncoming: "",
        IncomingProductCode : "",
        ProductNameOutgoing : "",
        OutgoingProductCode:"",
        Status : "",
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

        formstate.ProductNameIncoming = proNameIncoming;
        formstate.IncomingProductCode = inProductCode;
        formstate.ProductNameOutgoing = proNameOutgoing;
        formstate.OutgoingProductCode = outProductCode;
        formstate.Status = status;

        setformstate(formstate);


        const { ProductNameIncoming, IncomingProductCode, ProductNameOutgoing, OutgoingProductCode, Status} = formstate;

        const res = await fetch(`${baseUrl}api/v1/readProductMapping/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                ProductNameIncoming, IncomingProductCode, ProductNameOutgoing, OutgoingProductCode, Status, lastModified
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
        const res = await fetch(`${baseUrl}api/v1/readProductMapping/${id}`, {
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
                            <label className={Styles.Ac_form} htmlFor="">Product Name (Incoming)</label>
                            <input type="text" value={proNameIncoming} className={Styles.Ac_forminput} onChange={(e)=>{{setProNameIncoming(e.target.value)}}} />
                            <label htmlFor="" className={Styles.Ac_form}>Incoming Product Code</label>
                            <input type="text" value={inProductCode} className={Styles.Ac_forminput} onChange={(e)=>{{setInProductCode(e.target.value)}}} />
                            <label htmlFor="" className={Styles.Ac_form}>Product Name (Outgoing)</label>
                            <input type="text" value={proNameOutgoing} className={Styles.Ac_forminput} onChange={(e)=>{{setProNameOutgoing(e.target.value)}}} />
                            <label htmlFor="" className={Styles.Ac_form}>Outgoing Product Code</label>
                            <input type="text" value={outProductCode} className={Styles.Ac_forminput} onChange={(e)=>{{setoutProductCode(e.target.value)}}} />
                            <label htmlFor="" className={Styles.Ac_form}>Status</label>
                            <select name="" id="" value={status} className={Styles.Ac_forminput} onChange={(e)=>{{setStatus(e.target.value)}}}>
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