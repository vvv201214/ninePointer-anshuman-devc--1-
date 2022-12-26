import React from "react";
import "../Admin/Apiperameters/AdminForm.css";
import "../Admin/Apiperameters/AdminForm1.css";
import ExchangeForm from "./Apiperameters/ExchangeForm";
import VarietyForm from "./Apiperameters/VarietyForm";
import OrderForm from "./Apiperameters/OrderForm";
import ValidityForm from "./Apiperameters/ValidityForm";
import ProductForm from "./Apiperameters/ProductForm";
import Sidebar from "./Apiperameters/Sidebar";

function AdminForm() {
    return (
        <div>
            <div className="main_com_div">
            <h2 className="header">Hello Admin ! Welcome</h2>
            <h3 className="logo">API PARAMETER</h3> 
            <div className="main_div">
                <VarietyForm/>
                <ExchangeForm/>
                <OrderForm/>
                <ValidityForm/>
                <ProductForm/>
            </div>
                <Sidebar/>
           
            </div>
        </div>
    )
}
export default AdminForm