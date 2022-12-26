import Styles from "./Summary.module.css";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { userContext } from "../../AuthContext";


export default function Summary() {
    const getDetails = useContext(userContext);
    const [userDetail, setUserDetail] = useState([]);
    const [userTradeDetails, setUserTradeDetails] = useState([]);
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"
    let [firstDate, setFirstDate] = useState("");
    const [selectUserState, setSelectUserState] = useState("All User");
    let secondDate = "";
    let userId = (getDetails.userDetails.role === "admin") && getDetails.userDetails.email;

    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <div className={Styles.topbox}>
                            <div className={Styles.second_box}>
                                <div className={Styles.liveBoxone}>
                                    <div className={Styles.blinkitlive}>🟢 Company P&L(Live)</div>
                                    <div className={Styles.divGroupsOne}>
                                        <span className={Styles.box1}>
                                            <h3 className={Styles.boxliveData} >Gross P&L</h3>
                                            <h2 className={Styles.boxliveNumber}>14000</h2>
                                        </span>
                                        <span className={Styles.box2}>
                                            <h3 className={Styles.boxliveData} >Transaction Cost</h3>
                                            <h2 className={Styles.boxliveNumber}>2500</h2>
                                        </span>
                                        <span className={Styles.box3}>
                                            <h3 className={Styles.boxliveData} >Net P&L</h3>
                                            <h2 className={Styles.boxliveNumber}>9643</h2>
                                        </span>
                                    </div>
                                    <div className={Styles.divGroupsTwo}>
                                        <span className={Styles.box4}>
                                            <h3 className={Styles.boxliveData} >Open Lots</h3>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                        </span>
                                        <span className={Styles.box5}>
                                            <h3 className={Styles.boxliveData} >LTP</h3>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                        </span>

                                        <span className={Styles.box6}>
                                            <h3 className={Styles.boxliveData} ># Of Traders</h3>
                                            <table className={Styles.boxlive_table}>
                                                <tr className={Styles.boxlive_tr}>
                                                    <th className={Styles.boxlive_th}>Under Trade </th>
                                                    <th className={Styles.boxlive_th}>Ideal</th>
                                                    <th className={Styles.boxlive_th}>Total</th>
                                                </tr>
                                                <tr>
                                                    <td className={Styles.boxlive_td}>15</td>
                                                    <td className={Styles.boxlive_td}>3</td>
                                                    <td className={Styles.boxlive_td}>18</td>
                                                </tr>
                                            </table>
                                        </span>
                                    </div>

                                </div>
                                <div className={Styles.liveBoxone}>
                                    <div className={Styles.blinkitlive}>🟢 Trader P&L(Live)</div>
                                    <div className={Styles.divGroupsOne}>
                                        <span className={Styles.box1}>
                                            <h3 className={Styles.boxliveData} >Gross P&L</h3>
                                            <h2 className={Styles.boxliveNumber}>14000</h2>
                                        </span>
                                        <span className={Styles.box2}>
                                            <h3 className={Styles.boxliveData} >Transaction Cost</h3>
                                            <h2 className={Styles.boxliveNumber}>2500</h2>
                                        </span>
                                        <span className={Styles.box3}>
                                            <h3 className={Styles.boxliveData} >Net P&L</h3>
                                            <h2 className={Styles.boxliveNumber}>9643</h2>
                                        </span>
                                    </div>
                                    <div className={Styles.divGroupsTwo}>
                                        <span className={Styles.box4}>
                                            <h3 className={Styles.boxliveData} >Open Lots</h3>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                        </span>
                                        <span className={Styles.box5}>
                                            <h3 className={Styles.boxliveData} >LTP</h3>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                        </span>
                                        <span className={Styles.box6}>
                                            <h3 className={Styles.boxliveData} ># Of Traders</h3>
                                            <table className={Styles.boxlive_table}>
                                                <tr className={Styles.boxlive_tr}>
                                                    <th className={Styles.boxlive_th}>Under Trade</th>
                                                    <th className={Styles.boxlive_th}>Ideal</th>
                                                    <th className={Styles.boxlive_th}>Total</th>
                                                </tr>
                                                <tr>
                                                    <td className={Styles.boxlive_td}>15</td>
                                                    <td className={Styles.boxlive_td}>3</td>
                                                    <td className={Styles.boxlive_td}>18</td>
                                                </tr>
                                            </table>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className={Styles.second_box}>
                                <div className={Styles.mockBoxone}>
                                    <div className={Styles.blinkitmock}>🔵 Company P&L(Mock)</div>
                                    <div className={Styles.divGroupsOne}>
                                        <span className={`${Styles.box1} ${Styles.mockbox1}`}>
                                            <h3 className={Styles.boxliveData} >Gross P&L</h3>
                                            <h2 className={Styles.boxliveNumber}>14000</h2>
                                        </span>
                                        <span className={`${Styles.box2} ${Styles.mockbox1}`}>
                                            <h3 className={Styles.boxliveData} >Transaction Cost</h3>
                                            <h2 className={Styles.boxliveNumber}>2500</h2>
                                        </span>
                                        <span className={`${Styles.box3} ${Styles.mockbox1}`}>
                                            <h3 className={Styles.boxliveData} >Net P&L</h3>
                                            <h2 className={Styles.boxliveNumber}>9643</h2>
                                        </span>
                                    </div>
                                    <div className={Styles.divGroupsTwo}>
                                        <span className={`${Styles.box4} ${Styles.mockbox1}`}>
                                            <h3 className={Styles.boxliveData} >Open Lots</h3>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                        </span>
                                        <span className={`${Styles.box5} ${Styles.mockbox1}`}>
                                            <h3 className={Styles.boxliveData} >LTP</h3>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                        </span>
                                        <span className={`${Styles.box1} ${Styles.mockbox1}`}>
                                            <h3 className={Styles.boxliveData} ># Of Traders</h3>
                                            <table className={Styles.boxlive_table}>
                                                <tr className={Styles.boxlive_tr}>
                                                    <th className={Styles.boxlive_th}>Under Trade </th>
                                                    <th className={Styles.boxlive_th}>Ideal </th>
                                                    <th className={Styles.boxlive_th}>Total</th>
                                                </tr>
                                                <tr>
                                                    <td className={Styles.boxlive_td}>15</td>
                                                    <td className={Styles.boxlive_td}>3</td>
                                                    <td className={Styles.boxlive_td}>18</td>
                                                </tr>
                                            </table>
                                        </span>
                                    </div>
                                </div>
                                <div className={Styles.mockBoxone}>
                                    <div className={Styles.blinkitmock}>🔵 Trader P&L(Mock)</div>
                                    <div className={Styles.divGroupsOne}>
                                        <span className={`${Styles.box1} ${Styles.mockbox1}`}>
                                            <h3 className={Styles.boxliveData} >Gross P&L</h3>
                                            <h2 className={Styles.boxliveNumber}>14000</h2>
                                        </span>
                                        <span className={`${Styles.box2} ${Styles.mockbox1}`}>
                                            <h3 className={Styles.boxliveData} >Transaction Cost</h3>
                                            <h2 className={Styles.boxliveNumber}>2500</h2>
                                        </span>
                                        <span className={`${Styles.box3} ${Styles.mockbox1}`}>
                                            <h3 className={Styles.boxliveData} >Net P&L</h3>
                                            <h2 className={Styles.boxliveNumber}>9643</h2>
                                        </span>
                                    </div>
                                    <div className={Styles.divGroupsTwo}>
                                        <span className={`${Styles.box4} ${Styles.mockbox1}`}>
                                            <h3 className={Styles.boxliveData} >Open Lots</h3>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                        </span>
                                        <span className={`${Styles.box5} ${Styles.mockbox1}`}>
                                            <h3 className={Styles.boxliveData} >LTP</h3>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                            <h5 className={Styles.boxliveNumber}>18500CE <span>-2500</span></h5>
                                        </span>
                                        <span className={`${Styles.box6} ${Styles.mockbox1}`}>
                                            <h3 className={Styles.boxliveData} ># Of Traders</h3>
                                            <table className={Styles.boxlive_table}>
                                                <tr className={Styles.boxlive_tr}>
                                                    <th className={Styles.boxlive_th}>Under Trade </th>
                                                    <th className={Styles.boxlive_th}>Ideal </th>
                                                    <th className={Styles.boxlive_th}>Total</th>
                                                </tr>
                                                <tr>
                                                    <td className={Styles.boxlive_td}>15</td>
                                                    <td className={Styles.boxlive_td}>3</td>
                                                    <td className={Styles.boxlive_td}>18</td>
                                                </tr>
                                            </table>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

{/* <td className={Styles.topboxlive}>
<table>
<tr>
<td>Gross P&L</td>
<td>+25,000</td>
</tr>
</table>
</td>
<td className={Styles.topboxlive}>Some Text Here</td>
<td className={Styles.topboxlive}>Some Text Here</td>
</tr>

<td className={Styles.topboxlive}>Some Text Here</td>
<td className={Styles.topboxlive}>Some Text Here</td>
<td className={Styles.topboxlive}>Some Text Here</td>
</tr>
</table>
</td> */}
{/* <td>
<table> */}

{/* <tr>
<td className={Styles.topboxlive}>Some Text Here</td>
<td className={Styles.topboxlive}>Some Text Here</td>
<td className={Styles.topboxlive}>Some Text Here</td>
</tr>
<tr>
<td className={Styles.topboxlive}>Some Text Here</td>
<td className={Styles.topboxlive}>Some Text Here</td>
<td className={Styles.topboxlive}>Some Text Here</td>
</tr>
</table>
</td>
</tr>
<tr>
<td>
<table> */}