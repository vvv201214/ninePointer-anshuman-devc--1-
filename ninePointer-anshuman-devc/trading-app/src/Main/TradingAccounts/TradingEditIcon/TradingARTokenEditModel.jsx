import React, { useState } from "react";
import { useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import Styles from "./TradingARTokenEditModel.module.css";


export default function TradingARTokenEditModule ({ data, id, Render }) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

    let date = new Date();
    let lastModified = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

    const { reRender, setReRender } = Render;
    const [editData, setEditData] = useState(data);

    const [accountId, setaccountId] = useState();
    const [accessToken, setaccessToken] = useState();
    const [requestToken, setRequestToken] = useState();
    const [status, setStatus] = useState();
   
    useEffect(() => {
        let updatedData = data.filter((elem) => {
            return elem._id === id
        })
        setEditData(updatedData)
    }, [])

    useEffect(() => {
        console.log("edit data", editData);

        setaccountId(editData[0].accountId)
        setaccessToken(editData[0].accessToken);
        setRequestToken(editData[0].requestToken);
        setStatus(editData[0].status);

    }, [editData, reRender])
    console.log(editData, id);
    console.log(editData[0].accountId, accountId);
    const [formstate, setformstate] = useState({
        AccountID: "",
        AccesToken: "",
        RequestToken: "",
        Status: ""
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

        formstate.AccountID = accountId;
        formstate.AccesToken = accessToken;
        formstate.RequestToken = requestToken;
        formstate.Status = status;
        setModal(!modal);
        setformstate(formstate);


        const { AccountID, AccesToken, RequestToken, Status} = formstate;
                                        
        const res = await fetch(`${baseUrl}api/v1/readRequestToken/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                AccountID, AccesToken, RequestToken, Status, lastModified
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
        const res = await fetch(`${baseUrl}api/v1/readRequestToken/${id}`, {
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
                            <label className={Styles.Ac_form} htmlFor="">Account ID</label>
                            <input type="text" value={accountId} className={Styles.Ac_forminput} onChange={(e) => { {setaccountId(e.target.value) } }} />
                            <label className={Styles.Ac_form} htmlFor="">Access Token</label>
                            <input type="text" value={accessToken} className={Styles.Ac_forminput} onChange={(e) => { {setaccessToken(e.target.value) } }} />
                            <label className={Styles.Ac_form} htmlFor="">Request Token</label>
                            <input type="text" value={requestToken} className={Styles.Ac_forminput} onChange={(e) => { {setRequestToken(e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>Status</label>
                            <select name="" id="" value={status} className={Styles.Ac_forminput} onChange={(e) => { {setStatus(e.target.value) } }}>
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