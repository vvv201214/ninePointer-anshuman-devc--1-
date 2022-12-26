import React,{useState, useEffect} from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import uniqid from "uniqid";
import axios from "axios"
import Styles from "./AlgoModuleCSSFiles/ExchangeMapping.module.css";
import ExchangeMappingEditModel from "./AlgoEditIcon/ExchangeMappingEditModel";

function ExchangeMapping(){
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
    let uId = uniqid();
    let date = new Date();
    let createdOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    let lastModified = createdOn;
    let createdBy = "prateek"

    const [reRender, setReRender] = useState(true);
    const [data, setData] = useState([]);
    const [formstate, setformstate] = useState({
        ExchangeNameIncoming: "",
        IncomingExchangeCode : "",
        ExchangeNameOutgoing : "",
        OutgoingInstrumentCode:"",
        Status : "",
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

    useEffect(()=>{
        axios.get(`${baseUrl}api/v1/readExchangeMapping`)
        .then((res)=>{
            setData(res.data)
            console.log(res.data);
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })
    },[reRender])

    async function formbtn(e){
        e.preventDefault();
        setformstate(formstate);
        console.log(formstate)
        setModal(!modal);


        const {ExchangeNameIncoming, IncomingExchangeCode, ExchangeNameOutgoing, OutgoingInstrumentCode, Status} = formstate;

        const res = await fetch(`${baseUrl}api/v1/exchangeMapping`, {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                ExchangeNameIncoming, IncomingExchangeCode, ExchangeNameOutgoing, OutgoingInstrumentCode, Status, lastModified, uId, createdBy, createdOn
            })
        });
        
        const data = await res.json();
        console.log(data);
        if(data.status === 422 || data.error || !data){
            window.alert(data.error);
            console.log("invalid entry");
        }else{
            window.alert("entry succesfull");
            console.log("entry succesfull");
        }
        reRender ? setReRender(false) : setReRender(true)
    }
    return(
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                    <button onClick={toggleModal} className="Ac_btn">Create Exchange Mapping</button>
                        {modal && (
                            <div className="modal">
                                <div onClick={toggleModal} className="overlay"></div>
                                <div className={Styles.modalContent}>
                                    <div className={Styles.form_btn}>
                                        <form className={Styles.main_instrument_form}>
                                            <label className={Styles.Ac_form} htmlFor="">Exchange Name (Incoming)</label>
                                            <input type="text" className={Styles.Ac_form} onChange={(e)=>{{formstate.ExchangeNameIncoming = e.target.value}}} />
                                            <label htmlFor="" className={Styles.Ac_form}>Incoming Exchange Code</label>
                                            <input type="text" className={Styles.Ac_form} onChange={(e)=>{{formstate.IncomingExchangeCode = e.target.value}}} />
                                            <label htmlFor="" className={Styles.Ac_form}>Exchange Name (Outgoing)</label>
                                            <input type="text" className={Styles.Ac_form} onChange={(e)=>{{formstate.ExchangeNameOutgoing = e.target.value}}} />
                                            <label htmlFor="" className={Styles.Ac_form}>Outgoing Instrument Code</label>
                                            <input type="text" className={Styles.Ac_form} onChange={(e)=>{{formstate.OutgoingInstrumentCode = e.target.value}}} />
                                            <label htmlFor="" className={Styles.Ac_form}>Status</label>
                                            <select name="" id="" className={Styles.Ac_form} onChange={(e)=>{{formstate.Status = e.target.value}}}>
                                                <option value=""></option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                            <br />
                                            <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                        <span className="grid1_span">Exchange Mapping</span>
                        <div className="grid_1">
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                <th className="grid2_th">Created On</th>
                                <th className="grid2_th">Exchange Name (Incoming)</th>
                                <th className="grid2_th">Incoming Exchange Code</th>
                                <th className="grid2_th">Exchange Name (Outgoing)</th>
                                <th className="grid2_th">Outgoing Instrument Code</th>
                                <th className="grid2_th">Status</th>
                            </tr>
                            {
                                data.map((elem)=>{
                                    return(
                                        <tr className="grid2_tr" key={elem.uId} >
                                            <td className="grid2_td"><span className="Editbutton"><ExchangeMappingEditModel data={data} id={elem._id} Render={{setReRender, reRender}}/></span>{elem.createdOn}</td>
                                            <td className="grid2_td">{elem.ExchangeNameIncoming}</td>
                                            <td className="grid2_td">{elem.IncomingExchangeCode}</td>
                                            <td className="grid2_td">{elem.ExchangeNameOutgoing}</td>
                                            <td className="grid2_td">{elem.OutgoingInstrumentCode}</td>
                                            <td className="grid2_td">{elem.status}</td>
                                        </tr>
                                    )
                                })
                            }
                            </table>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
export default ExchangeMapping;