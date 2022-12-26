import React, { useEffect, useState } from "react";
import Styles from "./UserButtonModel.module.css";
import uniqid from "uniqid"


export default function UserButtonModel({Render}) {
  let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

  const {reRender, setReRender} = Render;
  let uId = uniqid();
  let date = new Date();
  let createdOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
  let lastModified = createdOn;
  let createdBy = "prateek"

  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  
  const [formstate, setformstate] = useState({
    Name:"",
    Designation:"",
    EmailID:"",
    MobileNo:"",
    Degree:"",
    DOB:"",
    Gender:"",
    TradingExp:"",
    Location:"",
    LastOccupation :"",
    DateofJoining :"",
    Role:"",
    Status:""
});

useEffect(()=>{

}, [reRender])

async function formbtn(e) {
    e.preventDefault();
    setformstate(formstate);
    console.log(formstate)
    setModal(!modal);

    const { Name, Designation, EmailID, MobileNo, Degree, DOB, Gender, TradingExp, Location, LastOccupation , DateofJoining, Role, Status} = formstate;

    const res = await fetch(`${baseUrl}api/v1/userdetail`, {
        method: "POST",
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify({
          name:Name, designation:Designation, email:EmailID, mobile:MobileNo, degree:Degree, dob:DOB, gender:Gender, trading_exp:TradingExp, location:Location,
          last_occupation:LastOccupation , joining_date:DateofJoining, role:Role, status:Status, uId, createdBy, createdOn, lastModified
        })
    });


    // const permissionData = await response.json();
    const data = await res.json();
    console.log(data);
    if(data.status === 422 || data.error || !data){ //  || permissionData.status === 422 || permissionData.error || !permissionData 
        window.alert(data.error);
        console.log("invalid entry");
    }else{
        window.alert("entry succesfull");
        console.log("entry succesfull");
    }
    reRender ? setReRender(false) : setReRender(true)

}
  const toggleModal = () => {
    setModal(!modal);
  };

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      <button onClick={toggleModal} className="Ac_btn">Create User</button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className={Styles.modalContent}>
          <form className={Styles.main_instrument_form}>
            <label className={Styles.Ac_form} htmlFor="">Name</label>
            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.Name = e.target.value } }}/>
            <label className={Styles.Ac_form} htmlFor="">Designation</label>
            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.Designation = (e.target.value)} }}/>
            <label className={Styles.Ac_form} htmlFor="">EmailID</label>
            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.EmailID = e.target.value} }}/>
            <label htmlFor="" className={Styles.Ac_form}>MobileNo</label>
            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.MobileNo = e.target.value } }} />
            <label htmlFor="" className={Styles.Ac_form}>Degree</label>
            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.Degree = e.target.value } }} />
            <label htmlFor="" className={Styles.Ac_form}>DOB</label>
            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.DOB = e.target.value } }} />
            <label htmlFor="" className={Styles.Ac_form}>Gender</label>
            <select name="" id="" className={Styles.Ac_forminput} onChange={(e) => { { formstate.Gender = e.target.value } }}>
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <label htmlFor="" className={Styles.Ac_form}>Trading Exp.</label>
            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.TradingExp = e.target.value } }} />
            <label htmlFor="" className={Styles.Ac_form}>Location</label>
            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.Location = e.target.value } }} />
            <label htmlFor="" className={Styles.Ac_form}>Last Occupation</label>
            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.LastOccupation = e.target.value } }} />
            <label htmlFor="" className={Styles.Ac_form}>Date of Joining</label>
            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.DateofJoining = e.target.value } }} />
            <label htmlFor="" className={Styles.Ac_form}>Role</label>
            <input type="text" className={Styles.Ac_forminput} onChange={(e) => { { formstate.Role = e.target.value } }} />
            <label htmlFor="" className={Styles.Ac_form}>Status</label>
            <select name="" id="" className={Styles.Ac_forminput} onChange={(e) => { { formstate.Status = e.target.value } }}>
                <option value=""></option>
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
            </select> 
        </form>
        <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button>
           
          </div>
        </div>
      )}
    </>
  );
}