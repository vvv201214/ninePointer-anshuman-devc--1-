import React,{useState, useEffect} from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import uniqid from "uniqid";
import axios from "axios"
import Styles from "./AlgoModuleCSSFiles/TradingAlgo.module.css";
import TradingAlgoEditModel from "./AlgoEditIcon/TradingAlgoEditModel";
import AddUser from "./AddUser/AddUser";
import RealTrade from "./RealTrade/RealTrade";

function TradingAlgo(){
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
    
    let uId = uniqid();
    let date = new Date();
    let createdOn = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
    let lastModified = createdOn;
    let createdBy = "prateek"

    const [reRender, setReRender] = useState(true);
    const [data, setData] = useState([]);
    const [formstate, setformstate] = useState({
        algoName: "",
        transactionChange : "",
        instrumentChange : "",
        status : "",
        exchangeChange:"",
        lotMultipler:"",
        productChange : "",
        tradingAccount:""
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
        axios.get(`${baseUrl}api/v1/readtradingAlgo`)
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

        const {algoName, transactionChange, instrumentChange, status, exchangeChange, lotMultipler, productChange, tradingAccount} = formstate;

        const res = await fetch(`${baseUrl}api/v1/tradingalgo`, {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                algoName, transactionChange, instrumentChange, status, exchangeChange, 
                lotMultipler, productChange, tradingAccount, lastModified, uId, createdBy, 
                createdOn, realTrade:false
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
                    <button onClick={toggleModal} className="Ac_btn">Create Trading Algo</button>
                        {modal && (
                            <div className="modal">
                                <div onClick={toggleModal} className="overlay"></div>
                                <div className={Styles.modalContent}>
                                    <div className={Styles.form_btn}>
                                        <form className={Styles.main_instrument_form}>
                                            <label className={Styles.Ac_form} htmlFor="">Algo Name</label>
                                            <input type="text" className={Styles.Ac_forminput} onChange={(e)=>{{formstate.algoName = e.target.value}}} />
                                            <label htmlFor="" className={Styles.Ac_form}>Transaction</label>
                                            <select name="" id="" className={Styles.Ac_forminput} onChange={(e)=>{{formstate.transactionChange = e.target.value}}}>
                                                <option value=""></option>
                                                <option value="TRUE">TRUE</option>
                                                <option value="FALSE">FALSE</option>
                                            </select>
                                            <label htmlFor="" className={Styles.Ac_form}>Instrument</label>
                                            <select name="" id="" className={Styles.Ac_forminput} onChange={(e)=>{{formstate.instrumentChange = e.target.value}}}>
                                                <option value=""></option>
                                                <option value="TRUE">TRUE</option>
                                                <option value="FALSE">FALSE</option>
                                            </select>
                                            <label htmlFor="" className={Styles.Ac_form}>Exchange</label>
                                            <select name="" id="" className={Styles.Ac_forminput} onChange={(e)=>{{formstate.exchangeChange = e.target.value}}}>
                                                <option value=""></option>
                                                <option value="TRUE">TRUE</option>
                                                <option value="FALSE">FALSE</option>
                                            </select>
                                            <label htmlFor="" className={Styles.Ac_form}>Product</label>
                                            <select name="" id="" className={Styles.Ac_forminput} onChange={(e)=>{{formstate.productChange = e.target.value}}}>
                                                <option value=""></option>
                                                <option value="TRUE">TRUE</option>
                                                <option value="FALSE">FALSE</option>
                                            </select>
                                            <label htmlFor="" className={Styles.Ac_form}>Multipler</label>
                                            <input type="text" className={Styles.Ac_forminput} onChange={(e)=>{{formstate.lotMultipler = e.target.value}}} />
                                            <label htmlFor="" className={Styles.Ac_form}>Trading Account</label>
                                            <input type="text" className={Styles.Ac_forminput} onChange={(e)=>{{formstate.tradingAccount = e.target.value}}} />
                                            <label htmlFor="" className={Styles.Ac_form}>Status</label>
                                            <select name="" id="" className={Styles.Ac_forminput} onChange={(e)=>{{formstate.status = e.target.value}}}>
                                                <option value=""></option>
                                                <option value="Active">Active</option>
                                                <option value="InActive">Inactive</option>
                                            </select>
                                            <br />
                                            <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                        <span className="grid1_span">Trading Algos</span>
                        <div className="grid_1">
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Created On</th>
                                    <th className="grid2_th">Algo Name</th>
                                    <th className="grid2_th">Users</th>
                                    <th className="grid2_th">Transaction</th>
                                    <th className="grid2_th">Instrument</th>
                                    <th className="grid2_th">Exchange</th>
                                    <th className="grid2_th">Product</th>
                                    <th className="grid2_th">Multiplier</th>
                                    <th className="grid2_th">Real Trade</th>
                                    <th className="grid2_th">Trading Account</th>
                                    <th className="grid2_th">Status</th>
                                </tr>
                            {
                                data.map((elem)=>{
                                    return(
                                        <tr className="grid2_tr" key={elem.uId}>
                                            <td className="grid2_td"><span className="Editbutton"><TradingAlgoEditModel data={data} id={elem._id} Render={{setReRender, reRender}}/></span>{elem.createdOn}</td>
                                            <td className="grid2_td">{elem.algoName}</td>
                                            <td className="grid2_td"><AddUser algoName={elem.algoName}/></td>
                                            <td className="grid2_td">{elem.transactionChange}</td>
                                            <td className="grid2_td">{elem.instrumentChange}</td>
                                            <td className="grid2_td">{elem.exchangeChange}</td>
                                            <td className="grid2_td">{elem.productChange}</td>
                                            <td className="grid2_td">{elem.lotMultipler}</td>
                                            <td className="grid2_td"><RealTrade id={elem._id} Render={{reRender, setReRender}} tradingAlgo={data} buttonTextBool={elem.isRealTrade}/></td>
                                            <td className="grid2_td">{elem.tradingAccount}</td>
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
export default TradingAlgo;
