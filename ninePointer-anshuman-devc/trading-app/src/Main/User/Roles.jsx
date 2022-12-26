import RoleButtonModel from "./Roles/RoleButtonModel";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RoleEditModel from "./EditIconModel/RoleEditModel";


function Roles() {
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

    const [reRender, setReRender] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
        axios.get(`${baseUrl}api/v1/readeveryonerole`)
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            }).catch((err)=>{
                window.alert("Server Down");
                return new Error(err);
            })
    }, [reRender])

    return (
        <div>
            <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                        <RoleButtonModel Render={{setReRender, reRender}}/>
                        <span className="grid1_span">User Roles</span>
                        <div className="grid_1">
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Created On</th>
                                    <th className="grid2_th">Role Name</th>
                                    <th className="grid2_th">Instruments</th>
                                    <th className="grid2_th">Trading Account</th>
                                    <th className="grid2_th">API Parameters</th>
                                    <th className="grid2_th">Users</th>
                                    <th className="grid2_th">AlgoBox</th>
                                    <th className="grid2_th">Reports</th>
                                </tr>
                                {data.map((elem) => {
                                    return (
                                        <tr className="grid2_tr">
                                            <td className="grid2_td"><span className="Editbutton"><RoleEditModel data={data} id={elem._id} Render={{setReRender, reRender}}/></span>{elem.createdOn}</td>
                                            <td className="grid2_td">{elem.roleName}</td>
                                            <td className="grid2_td">{elem.instruments}</td>
                                            <td className="grid2_td">{elem.tradingAccount}</td>
                                            <td className="grid2_td">{elem.APIParameters}</td>
                                            <td className="grid2_td">{elem.users}</td>
                                            <td className="grid2_td">{elem.algoBox}</td>
                                            <td className="grid2_td">{elem.reports}</td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Roles;