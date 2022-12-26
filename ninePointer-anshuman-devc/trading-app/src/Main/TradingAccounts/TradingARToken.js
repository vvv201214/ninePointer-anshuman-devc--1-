import React, { useState, useEffect } from "react";
import "./TradingAccounts.css";
import "./Accounts.css";
import uniqid from "uniqid"
import axios from "axios"
import Styles from "./TradingAccountsCSSFiles/TradingARToken.module.css";
import TradingARTokenEditModule from "./TradingEditIcon/TradingARTokenEditModel";

function TradingARToken() {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

    let uId = uniqid();
    let date = new Date();
    let generatedOn = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
    let lastModified = generatedOn;
    let createdBy = "prateek"

    const [activeData, setActiveData] = useState([]);
    const [inactiveData, setInactiveData] = useState([]);
    const [reRender, setReRender] = useState(true);
    const [formstate, setformstate] = useState({
        AccountID: "",
        AccesToken: "",
        RequestToken: "",
        Status: ""
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

    useEffect(() => {
        axios.get(`${baseUrl}api/v1/readRequestToken`)
            .then((res) => {
                let data = res.data;
                let active = data.filter((elem) => {
                    // console.log(elem.createdOn, createdOn);
                    return elem.status === "Active"
                })
                setActiveData(active);
                console.log(active);
                console.log("49",res.data, data)

                // (res.data).map(async (elem)=>{
                //     console.log("51")
                //     if(elem.status === "Active" && !(elem.generatedOn).includes(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`)){
                //         formstate.Status = "Inactive";
                //         const {Status, lastModified} = formstate;
                //         const res = await fetch(`${baseUrl}api/v1/readAccountDetails/${elem._id}`, {
                //             method: "PATCH",
                //             headers: {
                //                 "Accept": "application/json",
                //                 "content-type": "application/json"
                //             },
                //             body: JSON.stringify({
                //                 Status, lastModified
                //             })
                //         });
                //         const dataResp = await res.json();
                //         console.log(dataResp);
                //         if (dataResp.status === 422 || dataResp.error || !dataResp) {
                //             window.alert(dataResp.error);
                //             console.log("Failed to Edit");
                //         } else {
                //             console.log(dataResp);
                //             window.alert("Edit succesfull");
                //             console.log("Edit succesfull");
                //         }
                //     }
                // })
    
                let inActive = data.filter((elem) => {
                    return elem.status === "Inactive"
                })
                setInactiveData(inActive);
            }).catch((err)=>{
                window.alert("Server Down");
                return new Error(err);
            })
    }, [reRender])



    

    async function formbtn(e) {
        e.preventDefault();
        setformstate(formstate);
        console.log(formstate)
        setModal(!modal);

        const { AccountID, AccesToken, RequestToken, Status } = formstate;

        const res = await fetch(`${baseUrl}api/v1/requestToken`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                accountId: AccountID, accessToken: AccesToken, requestToken: RequestToken, status: Status, uId, createdBy, generatedOn, lastModified
            })
        });

        const data = await res.json();
        console.log(data);
        if (data.status === 422 || data.error || !data) {
            window.alert(data.error);
            console.log("invalid entry");
        } else {
            window.alert("entry succesfull");
            console.log("entry succesfull");
        }
        reRender ? setReRender(false) : setReRender(true)
    }

    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <button onClick={toggleModal} className="Ac_btn">Generate Access & Request Token</button>
                        {modal && (
                            <div className="modal">
                                <div onClick={toggleModal} className="overlay"></div>
                                <div className={Styles.modalContent}>
                                    <div className={Styles.form_btn}>
                                        <form className={Styles.main_instrument_form}>
                                            <label className={Styles.Ac_form} htmlFor="">Account ID</label>
                                            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.AccountID = e.target.value } }} />
                                            <label className={Styles.Ac_form} htmlFor="">Access Token</label>
                                            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.AccesToken = e.target.value } }} />
                                            <label className={Styles.Ac_form} htmlFor="">Request Token</label>
                                            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.RequestToken = e.target.value } }} />
                                            <label htmlFor="" className={Styles.Ac_form}>Status</label>
                                            <select name="" id="" className={Styles.Ac_forminput} onChange={(e) => { { formstate.Status = e.target.value } }}>
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
                        <span className="grid1_span">Active Access & Request Token</span>
                        <div className="grid_1">
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Account ID</th>
                                    <th className="grid2_th">Access Token</th>
                                    <th className="grid2_th">Request Token</th>
                                    <th className="grid2_th">Status</th>
                                    <th className="grid2_th">Generated On</th>
                                </tr>
                                {activeData.map((elem) => {
                                    return (
                                        <tr className="grid2_tr" key={elem.uId}>
                                            <td className="grid2_td"><span className="Editbutton"><TradingARTokenEditModule data={activeData} id={elem._id} Render={{setReRender, reRender}}/></span>{elem.accountId}</td>
                                            <td className="grid2_td">{elem.accessToken}</td>
                                            <td className="grid2_td">{elem.requestToken}</td>
                                            <td className="grid2_td">{elem.status}</td>
                                            <td className="grid2_td">{elem.generatedOn}</td>
                                        </tr>
                                    )
                                })
                                }
                            </table>
                        </div>
                    </div>
                    <span className="grid2_span">Expired Access & Request Token</span>
                    <div className="grid_2">
                        <table className="grid1_table">
                            <tr className="grid2_tr">
                                <th className="grid2_th">Account ID</th>
                                <th className="grid2_th">Access Token</th>
                                <th className="grid2_th">Request Token</th>
                                <th className="grid2_th">Status</th>
                                <th className="grid2_th">Generated On</th>
                            </tr>
                            {inactiveData.map((elem) => {
                                return (
                                    <tr className="grid2_tr" key={elem.uId}>
                                        <td className="grid2_td"><span className="Editbutton"><TradingARTokenEditModule data={inactiveData} id={elem._id} Render={{setReRender, reRender}}/></span>{elem.accountId}</td>
                                        <td className="grid2_td">{elem.accessToken}</td>
                                        <td className="grid2_td">{elem.requestToken}</td>
                                        <td className="grid2_td">{elem.status}</td>
                                        <td className="grid2_td">{elem.generatedOn}</td>
                                    </tr>
                                )
                            })
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TradingARToken;
