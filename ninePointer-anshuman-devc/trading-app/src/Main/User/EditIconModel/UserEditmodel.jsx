import React, { useState } from "react";
import { useEffect } from "react";
import { TiEdit } from "react-icons/ti";
import Styles from "./UserEditModel.module.css";
import axios from "axios";
import { useRef } from "react";

export default function UserEditModel({data, id, Render}) {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
    let permissionId = useRef(0);
    let date = new Date();
    let lastModified = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  
    const {reRender, setReRender} = Render;
    const[editData, setEditData] = useState(data);

    const [name, setName] = useState();
    const [designation, setDesignation] = useState();
    const [email, setEmail] = useState();
    const [dob, setDob] = useState();
    const [mobile, setMobile] = useState();
    const [gender, setGender] = useState();
    const [trading_exp, setTradingExp] = useState();
    const [location, setLocation] = useState();
    const [lastOccupation, setLastOccupation] = useState();
    const [joiningDate, setJoiningDate] = useState();
    const [role, setRole] = useState();
    const [status, setStatus] = useState();
    const [degree, setDegree] = useState();

    useEffect(()=>{

        let updatedData = data.filter((elem)=>{
            return elem._id === id
        })
        setEditData(updatedData)

        axios.get(`${baseUrl}api/v1/readpermission`)
        .then((res)=>{
            (res.data).map((elem)=>{
                if(editData[0].email === elem.userId){
                    permissionId.current = elem._id;
                }
            })
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })
    },[])

    useEffect(()=>{
        console.log("edit data", editData);

        setName(editData[0].name)
        setDesignation(editData[0].designation);
        setEmail(editData[0].email);
        setMobile(editData[0].mobile);
        setDegree(editData[0].degree);
        setDob(editData[0].dob);
        setGender(editData[0].gender);
        setTradingExp(editData[0].trading_exp);
        setLocation(editData[0].location);
        setLastOccupation(editData[0].last_occupation);
        setJoiningDate(editData[0].joining_date);
        setRole(editData[0].role);
        setStatus(editData[0].status);

    }, [editData, reRender])
        console.log(editData, id);
        console.log(editData[0].name, name);
        const [formstate, setformstate] = useState({
            Name: "",
            Designation: "",
            EmailID: "",
            MobileNo: "",
            Degree: "",
            DOB: "",
            Gender: "",
            TradingExp: "",
            Location: "",
            LastOccupation: "",
            DateofJoining: "",
            Role: "",
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

        formstate.Name = name;
        formstate.Designation = designation;
        formstate.Degree = degree;
        formstate.EmailID = email;
        formstate.MobileNo = mobile;
        formstate.DOB = dob;
        formstate.Gender = gender;
        formstate.TradingExp = trading_exp;
        formstate.Location = location;
        formstate.LastOccupation = lastOccupation;
        formstate.DateofJoining = joiningDate;
        formstate.Role = role;
        formstate.Status = status;

        setformstate(formstate);


        const { Name, Designation, Degree, EmailID, MobileNo, DOB, Gender, TradingExp, Location, LastOccupation, DateofJoining, Role, Status } = formstate;

        const res = await fetch(`${baseUrl}api/v1/readuserdetails/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                Name, Designation, Degree, EmailID, MobileNo, DOB, Gender, TradingExp, Location, LastOccupation, DateofJoining, Role, Status, lastModified
            })
        });


        const dataResp = await res.json();
        
        console.log(dataResp);
        if (dataResp.status === 422 || dataResp.error || !dataResp) {
            window.alert(dataResp.error);
            console.log("Failed to Edit");
        }else {
            console.log(dataResp);
            window.alert("Edit succesfull");
            console.log("Edit succesfull");
        }
        setModal(!modal);
        reRender ? setReRender(false) : setReRender(true)
    }

    async function Ondelete(){
      console.log(editData)
      const res = await fetch(`${baseUrl}api/v1/readuserdetails/${id}`, {
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
                                <label className={Styles.Ac_form} htmlFor="">Name</label>
                                <input type="text" value={name} className={Styles.Ac_forminput} onChange={(e)=>{setName( e.target.value)}}/>
                                <label className={Styles.Ac_form} htmlFor="">Designation</label>
                                <input type="text" value={designation} className={Styles.Ac_forminput} onChange={(e)=>{setDesignation( e.target.value)}} />
                                <label className={Styles.Ac_form} htmlFor="">EmailID</label>
                                <input type="text" value={email} className={Styles.Ac_forminput} onChange={(e)=>{setEmail( e.target.value)}} />
                                <label htmlFor="" className={Styles.Ac_form}>MobileNo</label>
                                <input type="text" value={mobile} className={Styles.Ac_forminput} onChange={(e)=>{setMobile( e.target.value)}} />
                                <label htmlFor="" className={Styles.Ac_form}>Degree</label>
                                <input type="text" value={degree} className={Styles.Ac_forminput} onChange={(e)=>{setDegree( e.target.value)}} />
                                <label htmlFor="" className={Styles.Ac_form}>DOB</label>
                                <input type="text" value={dob} className={Styles.Ac_forminput} onChange={(e)=>{setDob( e.target.value)}} />
                                <label htmlFor="" className={Styles.Ac_form}>Gender</label>
                                <select name="" value={gender} id="" className={Styles.Ac_forminput} onChange={(e)=>{setGender( e.target.value)}}>
                                    <option value=""></option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                <label htmlFor="" className={Styles.Ac_form}>Trading Exp.</label>
                                <input type="text" value={trading_exp} className={Styles.Ac_forminput} onChange={(e)=>{setTradingExp( e.target.value)}} />
                                <label htmlFor="" className={Styles.Ac_form}>Location</label>
                                <input type="text" value={location} className={Styles.Ac_forminput} onChange={(e)=>{setLocation( e.target.value)}} />
                                <label htmlFor="" className={Styles.Ac_form}>Last Occupation</label>
                                <input type="text" value={lastOccupation} className={Styles.Ac_forminput} onChange={(e)=>{setLastOccupation( e.target.value)}} />
                                <label htmlFor="" className={Styles.Ac_form}>Date of Joining</label>
                                <input type="text" value={joiningDate} className={Styles.Ac_forminput} onChange={(e)=>{setJoiningDate( e.target.value)}} />
                                <label htmlFor="" className={Styles.Ac_form}>Role</label>
                                <input type="text" value={role} className={Styles.Ac_forminput} onChange={(e)=>{setRole( e.target.value)}} />
                                <label htmlFor="" className={Styles.Ac_form}>Status</label>
                                <select name="" value={status} id="" className={Styles.Ac_forminput} onChange={(e)=>{setStatus( e.target.value)}}>
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