import React,{useState} from "react";
import Styles from "./TradingAccountsCSSFiles/TParameters.module.css";

function Tradingparameters(){
    const[isopen, setIsOpen] = useState(false)

    const[formstate, setformstate] = useState({
        createdOn: "",
        variety : "",
        exchange : "",
        orderType: "",
        validity : "",
        status:"",
        lastModifiedOn:"",
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


    function formbtn(e){
        e.preventDefault();
        setformstate(formstate);
        setIsOpen(!isopen);
        console.log(formstate)
        setModal(!modal);
        
    }
    return(
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                    <button onClick={toggleModal} className="Ac_btn">Add Trading Parameters</button>
                        {modal && (
                            <div className="modal">
                                <div onClick={toggleModal} className="overlay"></div>
                                <div className={Styles.modalContent}>
                                    <div className={Styles.form_btn}>
                                    <form className={Styles.main_instrument_form}>
                                        <label className={Styles.Ac_form} htmlFor="">Created On</label>
                                        <input type="text" className={Styles.Ac_forminput} onChange={(e)=>{{formstate.createdOn = e.target.value}}} />
                                        <label className={Styles.Ac_form} htmlFor="">Variety</label>
                                        <input type="text" className={Styles.Ac_forminput} onChange={(e)=>{{formstate.variety = e.target.value}}}/>
                                        <label className={Styles.Ac_form} htmlFor="">Exchange</label>
                                        <input type="text" className={Styles.Ac_forminput}  onChange={(e)=>{{formstate.exchange = e.target.value}}} />
                                        <label className={Styles.Ac_form} htmlFor="">Order Type</label>
                                        <input type="text" className={Styles.Ac_forminput}  onChange={(e)=>{{formstate.orderType = e.target.value}}} />
                                        <label className={Styles.Ac_form}htmlFor="">Validity</label>
                                        <input type="text" className={Styles.Ac_forminput}  onChange={(e)=>{{formstate.validity = e.target.value}}} />
                                        <label htmlFor="" className={Styles.Ac_form}>Status</label>
                                        <select name="" id="" className={Styles.Ac_forminput} onChange={(e)=>{{formstate.status = e.target.value}}}>
                                            <option value=""></option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="Active">Active</option>
                                        </select>
                                        <label className={Styles.Ac_form}htmlFor="">Last Modified On</label>
                                        <input type="text" className={Styles.Ac_forminput}  onChange={(e)=>{{formstate.lastModifiedOn = e.target.value}}} />                        
                                        <br />
                                        <button className={Styles.ACform_tbn} onClick={formbtn}>OK</button>

                                    </form>
                                    </div>
                                </div>
                            </div>
                        )}
                        <span className="grid1_span">Active Trading Parameters</span>
                        <div className="grid_1">
                            <table className="grid1_table">
                            <tr className="grid2_tr">
                                <th className="grid2_th">Created On</th>
                                <th className="grid2_th">Variety</th>
                                <th className="grid2_th">Exchange</th>
                                <th className="grid2_th">Order Type</th>
                                <th className="grid2_th">Validity</th>
                                <th className="grid2_th">Status</th>
                                <th className="grid2_th">Last Modified On</th>
                            </tr>
                            </table>
                        </div>
                        
                        <span className="grid2_span">Inactive Trading Parameters</span>
                        <div className="grid_2">
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Broker</th>
                                    <th className="grid2_th">Account ID</th>
                                    <th className="grid2_th">Account Name</th>
                                    <th className="grid2_th">API Key</th>
                                    <th className="grid2_th">API Secret</th>
                                    <th className="grid2_th">Status</th>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Tradingparameters;
