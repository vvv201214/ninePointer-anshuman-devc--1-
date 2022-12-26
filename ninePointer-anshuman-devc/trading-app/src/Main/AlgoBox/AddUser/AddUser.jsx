import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../../AuthContext";
import Styles from "./AddUser.module.css";
import UserList from "./UserList";


export default function AddUser({algoName}) {
    
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
    
    let date = new Date();
    const getDetails = useContext(userContext);
    let modifiedOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    let modifiedBy = getDetails.userDetails.name;

    const [userNam, setUserNam] = useState();
    const [entrading, setEntrading] = useState();
    const [reTrading, setreTrading] = useState();


    
    const [reRender, setReRender] = useState(true);
    const [permissionData, setPermissionData] = useState([]);
    console.log(permissionData);
    
    const [modal, setModal] = useState(false);
    const [addUser, setAddUser] = useState([]);
    const toggleModal = () => {
        setAddUser([]);
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    let permissionDataUpdated = permissionData.filter((elem)=>{
        return elem.algoName === algoName;
    })

    console.log("addUser", addUser, "permissionDataUpdated", permissionDataUpdated, permissionData);
    let newData = addUser.concat(permissionDataUpdated);
    console.log("this is add usere", newData);

    const[algoData, setAlgoData] = useState({
        name:"",
        tradingEnable:"",
        realTrading:"",
    });

    function formbtn(e, id) {
        e.preventDefault();
        // setModal(!modal);
        let flag = true;
        let newDataUpdated = newData.filter((elem)=>{
            return elem._id === id
        })
        algoData.name=newDataUpdated[0].userName;
        algoData.tradingEnable = entrading;
        algoData.realTrading = reTrading;
        setAlgoData(algoData);
        console.log(algoData, newDataUpdated);

        if(permissionDataUpdated.length){
            for(let elem of permissionDataUpdated){
                if(elem.userId === newDataUpdated[0].userId){
                    console.log("put request");
                    patchReq(id);
                    flag = false;
                }
            }
            if(flag){
                console.log("post request");
                postReq(newDataUpdated);
            }
        } else{
            console.log("post request");
            postReq(newDataUpdated);
        }

        setAddUser([]);
        reRender ? setReRender(false) : setReRender(true)
    }

    async function deletehandler(id){
        const response = await fetch(`${baseUrl}api/v1/readpermission/${id}`, {
            method: "DELETE",
        });
        const permissionData = await response.json();

        if(permissionData.status === 422 || permissionData.error || !permissionData){
            window.alert(permissionData.error);
            console.log("Failed to Delete");
        }else {
            console.log(permissionData);
            window.alert("Delete succesfull");
            console.log("Delete succesfull");
        }

        reRender ? setReRender(false) : setReRender(true)
    }

    async function postReq(newDataUpdated){
        const {name, tradingEnable, realTrading} = algoData;
        const {userId} = newDataUpdated[0];
        const response = await fetch(`${baseUrl}api/v1/permission`, {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
              modifiedOn, modifiedBy, userName:name, userId, 
              isTradeEnable:tradingEnable, isRealTradeEnable:realTrading, algoName
            })
        });

        const permissionData = await response.json();

        if(permissionData.status === 422 || permissionData.error || !permissionData){ 
            window.alert(permissionData.error);
            console.log("invalid entry");
        }else{
            // window.alert("entry succesfull");
            console.log("entry succesfull");
        }
    }

    async function patchReq(id){
        const {name, tradingEnable, realTrading} = algoData;
        console.log("algoData", algoData);
        const response = await fetch(`${baseUrl}api/v1/readpermissionadduser/${id}`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json"
            },
            body: JSON.stringify({
                modifiedOn, modifiedBy, isTradeEnable:tradingEnable, isRealTradeEnable:realTrading
            })
        });

        const permissionData = await response.json();

        if (permissionData.status === 422 || permissionData.error || !permissionData) {
            window.alert(permissionData.error);
            console.log("Failed to Edit");
        }else {
            console.log(permissionData);
            window.alert("Edit succesfull");
            console.log("Edit succesfull");
        }
    }
    

    return (
        <>
            <button onClick={toggleModal} className={Styles.addUserBtn}>Map Users</button>


            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className={Styles.modalContent}>
                        <UserList reRender={reRender} algoName={algoName} addUser={addUser} setAddUser={setAddUser} setPermissionData={setPermissionData}/>
                        <table className={Styles.main_instrument_table}>
                            <tr className={Styles.addUser_tr}>
                                <th className={Styles.addUser_th}>User Name</th>
                                <th className={Styles.addUser_th}>Enable Trading</th>
                                <th className={Styles.addUser_th}>Real Trading</th>
                                <th className={Styles.addUser_th}>Action</th>
                            </tr>
                            {newData.map((elem)=>{ // value={entrading} value={reTrading}
                                return(
                                    <tr key={elem._id} className={Styles.addUser_tr}>
                                        <td className={Styles.addUser_td}>{elem.userName}</td>
                                        <td className={Styles.addUser_td}>
                                            <select name="" id=""  className={Styles.addUser_select} onChange={(e)=>{{setEntrading(e.target.value)}}}>
                                                <option value=""></option>
                                                <option value="true">True</option>
                                                <option value="false">False</option>
                                            </select>
                                        </td>
                                        <td className={Styles.addUser_td}>
                                            <select name="" id=""  className={Styles.addUser_select} onChange={(e)=>{{setreTrading(e.target.value)}}}>
                                                <option value=""></option>
                                                <option value="true">True</option>
                                                <option value="false">False</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button className={Styles.ACform_tbn} onClick={(e)=>formbtn(e, elem._id)}>OK</button>
                                            <button className={Styles.ACform_tbn_Delete} onClick={(e)=>deletehandler((elem._id))}>🗑️</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}