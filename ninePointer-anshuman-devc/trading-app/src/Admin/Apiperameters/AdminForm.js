import React from "react";
import "./AdminForm.css";
import "./AdminForm1.css";
import ExchangeForm from "./ExchangeForm";
import VarietyForm from "./VarietyForm";
import OrderForm from "./OrderForm";
import ValidityForm from "./ValidityForm";
import ProductForm from "./ProductForm";


function AdminForm() {
    return (
        <div>
            <h2 className="header">Hello Admin ! Welcome</h2>
            
            <div className="main_div">
            <VarietyForm/>
            <ExchangeForm/>
            <OrderForm/>
            <ValidityForm/>
            <ProductForm/>
        </div>
        </div>
    )
}
export default AdminForm