import React, { useState } from "react";
import Styles from "./RoleButtonModel.module.css";
import { useEffect } from "react";
import uniqid from "uniqid";
import axios from "axios";

export default function RoleButtonModel() {
  let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

  let uId = uniqid();
  let date = new Date();
  let createdOn = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  let lastModified = createdOn;
  let createdBy = "prateek"

  const [modal, setModal] = useState(false);
  const [formstate, setformstate] = useState({
    roleName: "",
    instruments: "",
    tradingAccount: "",
    APIParameters: "",
    users: "",
    algoBox: "",
    reports: "",
  });

  async function formbtn(e) {
    e.preventDefault();
    setformstate(formstate);
    console.log(formstate)

    const { roleName, instruments, tradingAccount, APIParameters, users, algoBox, reports } = formstate;

    const res = await fetch(`${baseUrl}api/v1/everyonerole`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
       roleName, instruments, tradingAccount, APIParameters, users, algoBox, reports, uId, createdBy, createdOn, lastModified
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
    // reRender ? setReRender(false) : setReRender(true)

    setModal(!modal);

  }
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="Ac_btn">Create Role</button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className={Styles.modalContent}>
            <form className={Styles.main_instrument_form}>
              <label className={Styles.Ac_form} htmlFor="">Role Name</label>
              <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.roleName = (e.target.value) } }} />
              <label className={Styles.Ac_form} htmlFor="">Instruments</label>
              <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.instruments = e.target.value } }} />
              <label htmlFor="" className={Styles.Ac_form}>Trading Account</label>
              <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.tradingAccount = e.target.value } }} />
              <label htmlFor="" className={Styles.Ac_form}>API Parameters</label>
              <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.APIParameters = e.target.value } }} />
              <label htmlFor="" className={Styles.Ac_form}>Users</label>
              <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.users = e.target.value } }} />
              <label htmlFor="" className={Styles.Ac_form}>AlgoBox</label>
              <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.algoBox = e.target.value } }} />
              <label htmlFor="" className={Styles.Ac_form}>Reports</label>
              <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.reports = e.target.value } }} />
            </form>
            <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button>

          </div>
        </div>
      )}
    </>
  );
}