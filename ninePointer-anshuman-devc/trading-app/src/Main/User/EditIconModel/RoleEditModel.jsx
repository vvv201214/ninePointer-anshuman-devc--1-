import React, { useState } from "react";
import { useEffect } from "react"
import { TiEdit } from "react-icons/ti";
import Styles from "./RoleEditModel.module.css";

function RoleEditModel({data, id, Render}) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

    let date = new Date();
    let lastModified = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  

    const {reRender, setReRender} = Render;
    const[editData, setEditData] = useState(data);

    const [roleName, setRoleName] = useState();
    const [instruments, setInstruments] = useState();
    const [trandingAC, setTrandingAC] = useState();
    const [apiParameters, setApiParameters] = useState();
    const [users, setUsers] = useState();
    const [algoBox, setAlgoBox] = useState();
    const [reports, setReports] = useState();

    useEffect(()=>{
        let updatedData = data.filter((elem)=>{
            return elem._id === id
        })
        setEditData(updatedData)
    },[])

    useEffect(()=>{
        console.log("edit data", editData);

        setRoleName(editData[0].roleName)
        setInstruments(editData[0].instruments);
        setTrandingAC(editData[0].tradingAccount);
        setApiParameters(editData[0].APIParameters);
        setUsers(editData[0].users);
        setAlgoBox(editData[0].algoBox);
        setReports(editData[0].reports);
       
    }, [editData, reRender])
    
    console.log(editData, id);
    console.log(editData[0].roleName, roleName);
    const [formstate, setformstate] = useState({
        roleName1: "",
        instruments: "",
        tradingAccount: "",
        APIParameters: "",
        users: "",
        algoBox: "",
        reports: "",
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

        formstate.roleName1 = roleName;
        formstate.instruments1 = instruments;
        formstate.tradingAccount = trandingAC;
        formstate.APIParameters = apiParameters;
        formstate.users1 = users;
        formstate.algoBox1 = algoBox;
        formstate.reports1 = reports;

        console.log(formstate);
        setformstate(formstate);


        const { roleName1, instruments1, tradingAccount, APIParameters, users1, algoBox1, reports1 } = formstate;

        const res = await fetch(`${baseUrl}api/v1/readeveryonerole/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                roleName1, instruments1, tradingAccount, APIParameters, users1, algoBox1, reports1, lastModified
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

    async function Ondelete(){
      console.log(editData)
      const res = await fetch(`${baseUrl}api/v1/readeveryonerole/${id}`, {
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
                            <label className={Styles.Ac_form} htmlFor="">Role Name</label>
                            <input type="text" value={roleName} className={Styles.Ac_forminput} onChange={(e) => { { setRoleName (e.target.value) } }} />
                            <label className={Styles.Ac_form} htmlFor="">Instruments</label>
                            <input type="text" value={instruments} className={Styles.Ac_forminput} onChange={(e) => { { setInstruments(e.target.value)  } }} />
                            <label htmlFor="" className={Styles.Ac_form}>Trading Account</label>
                            <input type="text" value={trandingAC} className={Styles.Ac_forminput} onChange={(e) => { { setTrandingAC (e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>API Parameters</label>
                            <input type="text" value={apiParameters} className={Styles.Ac_forminput} onChange={(e) => { { setApiParameters (e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>Users</label>
                            <input type="text" value={users} className={Styles.Ac_forminput} onChange={(e) => { { setUsers (e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>AlgoBox</label>
                            <input type="text" value={algoBox} className={Styles.Ac_forminput} onChange={(e) => { { setAlgoBox(e.target.value) } }} />
                            <label htmlFor="" className={Styles.Ac_form}>Reports</label>
                            <input type="text" value={reports} className={Styles.Ac_forminput} onChange={(e) => { { setReports(e.target.value) } }} />
                        </form>
                        <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button> <button className={Styles.ACform_tbn} onClick={Ondelete}>Delete</button>
                    </div>
                </div>
            )}
        </>
    )
}
export default RoleEditModel;