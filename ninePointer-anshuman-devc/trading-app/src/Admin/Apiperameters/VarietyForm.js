import React from "react";
import "./AdminForm.css";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { useState } from "react";

function VarietyForm() {
    const [input, setInput] = useState("")
    const [redio, setredio] = useState("")
    const [list, setlist] = useState([]);

    async function clickhandler(e) {
        e.preventDefault()
        console.log(input, redio)
        let date = `${(new Date()).getDate()}-${(new Date()).getMonth()+1}-${(new Date()).getFullYear()}`
        list.push({ name: input, active: redio, modifiedOn:date, createdOn:date})
        setlist([...list])
        setInput("")
        setredio("")

        const {name, active, modifiedOn, createdOn} = list[list.length-1];

        const res = await fetch("http://localhost:8000/apiVeriety", {
            method: "POST",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                name, active, modifiedOn, createdOn
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

    }
    return (
        <div>
            <Popup trigger={<button>Variety Form</button>} className="Popup" >
                <form className="main_form" on>
                    <h2>Varity Form</h2>
                    <label htmlFor="name">Variety Name:</label>&nbsp;
                    <input type="text" value={input} className="name_input" onChange={(event) => { setInput(event.target.value) }} />
                    <br /><br />
                    <label htmlFor="">Status</label>&nbsp;&nbsp;
                    <select className="select_input" value={redio} id="" onChange={(event) => { setredio(event.target.value) }}>
                        <option value=""></option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <br /><br />
                    <button className="form_btn" onClick={clickhandler}>OK</button>
                </form>
            </Popup>
            {
                list.map((result) => {
                    return (
                        <div className="output_div">
                            <ul className="output_list">
                                <li className="output_li">{result.name} &nbsp;{result.status}</li>
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default VarietyForm;