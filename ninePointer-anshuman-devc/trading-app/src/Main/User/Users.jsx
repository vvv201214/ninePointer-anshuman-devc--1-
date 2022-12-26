import React,{useState, useEffect} from "react";
import UserButtonModel from "./UserButtonModel";
import axios from "axios";
import UserEditModel from "./EditIconModel/UserEditmodel";


function Users(){
    let baseUrl = process.env.NODE_ENV === "production" ? "/" : "http://localhost:8000/"

    const [reRender, setReRender] = useState(true);
    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get(`${baseUrl}api/v1/readuserdetails`)
        .then((res)=>{
            setData(res.data);
            console.log(res.data);
        }).catch((err)=>{
            window.alert("Server Down");
            return new Error(err);
        })

       
        
    },[reRender])

    return(
        <div>
             <div className="main_Container">
                <div className="right_side">
                    <div className="rightside_maindiv">
                    <UserButtonModel Render={{setReRender, reRender}}/>
                    <span className="grid1_span">User Details</span>
                        <div className="grid_1">
                            <table className="grid1_table">
                                <tr className="grid2_tr">
                                    <th className="grid2_th">Name</th>
                                    <th className="grid2_th">Designation</th>
                                    <th className="grid2_th">Email ID</th>
                                    <th className="grid2_th">Mobile No.</th>
                                    {/* <th className="grid2_th">Degree</th> */}
                                    {/* <th className="grid2_th">DOB</th> */}
                                    <th className="grid2_th">Gender</th>
                                    <th className="grid2_th">Trading Exp.</th>
                                    <th className="grid2_th">Location</th>
                                    {/* <th className="grid2_th">Last Occupation</th> */}
                                    <th className="grid2_th">Date of Joining</th>
                                    <th className="grid2_th">Role</th>
                                    <th className="grid2_th">Status</th>
                                </tr>
                            {data.map((elem)=>{
                                return(
                                <tr className="grid2_tr" key={elem._id}>
                                    <td className="grid2_td"><span className="Editbutton"><UserEditModel data={data} id={elem._id} Render={{setReRender, reRender}}/></span>{elem.name}</td>
                                    <td className="grid2_td">{elem.designation}</td>
                                    <td className="grid2_td">{elem.email}</td>
                                    <td className="grid2_td">{elem.mobile}</td>
                                    {/* <td className="grid2_td">{elem.degree}</td> */}
                                    {/* <td className="grid2_td">{elem.dob}</td> */}
                                    <td className="grid2_td">{elem.gender}</td>
                                    <td className="grid2_td">{elem.trading_exp}</td>
                                    <td className="grid2_td">{elem.location}</td>
                                    {/* <td className="grid2_td">{elem.last_occupation}</td> */}
                                    <td className="grid2_td">{elem.joining_date}</td>
                                    <td className="grid2_td">{elem.role}</td>
                                    <td className="grid2_td">{elem.status}</td>
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
export default Users;